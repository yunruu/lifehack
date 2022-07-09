import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, Image } from "react-native";
import { BlueButton, PinkTextInput, Footer } from "../config/reusable";
import { auth, db } from "../config/Firebase";
import Colours from "../config/colours";

function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    if (email == "" || password == "") {
      alert("Enter details to sign up!");
    } else {
      // Create new account for user
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // Add in user details in firestore
          db.collection("users").doc(res.user.uid).set({
            name: name,
            email: email,
            points: 0
          });

          // Update details in firebase authentication
          res.user.updateProfile({
            displayName: name,
          });

          // Alerts user to log in with new account
          alert("Log in with your new account");

          // Reset state on sign up page
          setName("");
          setEmail("");
          setPassword("");

          // Navigates to login page for user to log in with new account
          navigation.navigate("Login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
          } else if (error.code === "auth/invalid-email") {
            alert("Invalid email");
          } else {
            alert(error.message);
          }
          navigation.navigate("Login");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/logo.png')} />
      <PinkTextInput
        onChangeText={(val) => setEmail(val)}
        placeholder={"Email"}
      />
      <PinkTextInput
        onChangeText={(val) => setName(val)}
        placeholder={"Name"}
      />
      <PinkTextInput
        onChangeText={(val) => setPassword(val)}
        placeholder={"Password"}
        secureTextEntry={true}
      />
      <BlueButton 
        text={"SIGN UP"} 
        style={styles.loginButton}
        textStyle={styles.loginText}
        onPress={() => handleSignUp()} />
      <Footer
        desc={"Already have an account?"}
        text={"Log in"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height:200,
    overflow: 'visible',
    resizeMode: 'contain',
  },

  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
  },
  loginButton: {
    backgroundColor: Colours.middleBlueGreen,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 25,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: Colours.middleBlueGreen,
    paddingVertical: -1, 
    textAlign: 'center',
    borderRadius: 900,
    marginBottom: 0,
  }
});
export default SignUp;

import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, Image } from "react-native";
import { BlueButton, PinkTextInput, Footer } from "../config/reusable";
import { auth, db } from "../config/Firebase";
import Colours from "../config/colours";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (email == "" || password == "") {
      alert("Enter details to log in!");
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          // Reset state
          setEmail("");
          setPassword("");
          // Navigate to homepage with successful login
          navigation.navigate("ProfilePage");
        })
        .catch((error) => {
          // Error handling
          if (error.code === "auth/invalid-email") {
            alert("Invalid email");
          }
          if (error.code === "auth/user-not-found") {
            alert("User not found.");
          }
          if (error.code === "auth/wrong-password") {
            alert("Wrong password");
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/logo.png')} /> 
      {/* <Text style={{ fontSize: 20 }}>Hello there,</Text> */}
      {/* <Text style={{ fontSize: 20 }}>Welcome back!</Text> */}
      <PinkTextInput
        onChangeText={(val) => setEmail(val)}
        placeholder={"Email"}
        value={email}
      />
      <PinkTextInput
        onChangeText={(val) => setPassword(val)}
        placeholder={"Password"}
        value={password}
        secureTextEntry={true}
      />
      <BlueButton text={"LOG IN"} 
        style={styles.loginButton}
        textStyle={styles.loginText}
        onPress={() => handleLogin()} />
      <Footer
        desc={"Don't have an account yet?"}
        text={"Sign up"}
        onPress={() => navigation.navigate("Signup")}
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
  },
});
export default Login;

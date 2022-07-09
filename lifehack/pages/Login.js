import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { BlueButton, PinkTextInput, Footer } from "../config/reusable";
import { auth, db } from "../config/firebase";

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
      <Text style={{ fontSize: 20 }}>Hello there,</Text>
      <Text style={{ fontSize: 20 }}>Welcome Back</Text>
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
      <BlueButton text={"Log In"} onPress={() => handleLogin()} />
      <Footer
        desc={"Don't have an account yet?"}
        text={"Sign up"}
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Login;

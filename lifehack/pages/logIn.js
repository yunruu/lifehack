import React, { useState } from "react";
import { BlueButton, PinkTextInput } from "../config/reusable";
import { auth, db } from "../config/firebase";

function Login(props) {
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
          this.props.navigation.navigate("Profile");
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
    <View>
      <PinkTextInput
        onChangeText={(val) => setEmail(val)}
        placeholder={"email"}
      />
      <PinkTextInput
        onChangeText={(val) => setPassword(val)}
        placeholder={"password"}
      />
      <BlueButton text={"Login"} onPress={() => handleLogin} />
      <Footer
        desc={"Don't have an account yet?"}
        text={"Sign up"}
        onPress={this.onFooterLinkPress}
      />
    </View>
  );
}

export default Login;

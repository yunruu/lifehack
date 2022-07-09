import React from "react";
import { Text, View } from "react-native";
import { auth, db } from "../config/firebase";
import { BlueButton } from "../config/reusable";

function Profile({ navigation }) {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome, {auth.currentUser.displayName} </Text>
      <BlueButton text={"Log out"} onPress={() => handleLogout()} />
    </View>
  );
}

export default Profile;

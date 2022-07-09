import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FoodInput() {
  return (
    <View>
      <View style={styles.circle}></View>
      <View style={styles.container}>
        <Ionicons name="restaurant-outline" color="#95B8D1" size="35" />
        <Text style={styles.header}>Key in your food items!</Text>
      </View>
      <TextInput style={styles.box} placeholder="Food Item"></TextInput>
      <TextInput style={styles.box} placeholder="Expiry Date"></TextInput>
      <TextInput style={styles.box} placeholder="Price"></TextInput>
      <TextInput style={styles.box} placeholder="Quantity"></TextInput>
      <TouchableOpacity style={styles.add}>
        <Ionicons name="add-circle" color="#95B8D1" size="65" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    backgroundColor: "#EAC4D5",
    alignItems: "center",
    justifyContent: "center",
    width: 450,
    height: 250,
    marginTop: -700,
    paddingTop: 900,
    borderRadius: 200,
    marginLeft: -17,
  },

  container: {
    flexDirection: "row",
    paddingLeft: 20,
    marginTop: 20,
    marginTop: 20,
  },

  header: {
    fontSize: 25,
    paddingLeft: 20,
    fontWeight: "bold",
  },

  box: {
    width: 350,
    height: 50,
    alignSelf: "center",
    backgroundColor: "#D6EADF",
    marginTop: 50,
    paddingLeft: 20,
  },

  add: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
});

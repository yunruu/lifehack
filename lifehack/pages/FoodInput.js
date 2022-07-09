import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, auth } from "../config/Firebase.js";
import DatePicker from 'react-native-datepicker'
import colours from "../config/colours.js";

export default function FoodInput() {
  const [food, setFood] = useState("");
  const [expiry, setExpiry] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const onSubmitHandler = async () => {
    try {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("current")
        .doc()
        .set({
          food: food,
          expiry: expiry,
          price: price,
          quantity: quantity,
          eaten: false,
        });

      console.log("onSubmitHandler success");

      clearForm();
    } catch (err) {
      console.log("onSubmitHandler failure", err);
    }
  };

  const clearForm = () => {
    setFood("");
    setExpiry("");
    setPrice("");
    setQuantity("");
    Keyboard.dismiss();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.circle}></View>
      <View style={styles.container}>
        <Ionicons name="restaurant-outline" color="#95B8D1" size="35" />
        <Text style={styles.header}>Key in your food items!</Text>
      </View>
      <TextInput
        style={styles.box}
        placeholder="Food Item"
        onChangeText={setFood}
        value={food}
      ></TextInput>
      <DatePicker
        style={{marginTop: 50, width: "90%", paddingLeft: 20}}
        date={expiry}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate= "01-01-2022"
        maxDate="31-12-2050"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
          },
          datePickerCon: { backgroundColor: 'white', }
        }}
        onDateChange={
          (date) => {const str = date
                     const result = date.split("-")
                     const [day, month, year] = result
                     console.log(day)
                     console.log(date)
                     console.log(month)
                     console.log(year)
                    setExpiry(new Date(year, month, day))}}
      />
      {/*<TextInput
        style={styles.box}
        placeholder="Expiry Date"
        onChangeText={setExpiry}
        value={expiry}
  ></TextInput>*/}
      <TextInput
        style={styles.box}
        placeholder="Price"
        onChangeText={setPrice}
        value={price}
      ></TextInput>
      <TextInput
        style={styles.box}
        placeholder="Quantity"
        onChangeText={setQuantity}
        value={quantity}
      ></TextInput>
      <TouchableOpacity style={styles.add} onPress={onSubmitHandler}>
        <Ionicons name="add-circle" color="#95B8D1" size="65" />
      </TouchableOpacity>
    </ScrollView>
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


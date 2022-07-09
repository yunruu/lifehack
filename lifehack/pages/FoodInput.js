
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from '../config/firebase.js'
export default function FoodInput() { 

  
  const [food, setFood] = useState('');
  const [expiry, setExpiry] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const { currentUser } = auth;
 
  const onSubmitHandler = async () => {

      try {
          const foodRef = await db.collection, {
              food: food,
              expiry: expiry,
              price: price,
              quantity: quantity,
              username: currentUser.displayName,
              profileImg: currentUser.photoURL,
              timestamp: serverTimestamp(),
              email: currentUser.email,
          });

          console.log('onSubmitHandler success', foodRef.id);
          
          clearForm();
      } catch (err) {
          console.log('onSubmitHandler failure', err);
      }
  };

  const clearForm = () => {
    setFood('');
    setExpiry('');
    setPrice('');
    setQuantity('');
    Keyboard.dismiss();
};

    return (
      <View >
        <View style={styles.circle}></View>
        <View style={styles.container}>
          <Ionicons name="restaurant-outline" color="#95B8D1" size="35" />
          <Text style={styles.header}>Key in your food items!</Text>
        </View>
        <TextInput style={styles.box} 
                   placeholder="Food Item"
                   onChangeText={setFood}
                   value={food}>
        </TextInput>
        <TextInput style={styles.box} 
                   placeholder="Expiry Date"
                   onChangeText={setExpiry}
                   value={expiry}>
        </TextInput>
        <TextInput style={styles.box} 
                   placeholder="Price"
                   onChangeText={setPrice}
                   value={price}>
        </TextInput>
        <TextInput style={styles.box} 
                   placeholder="Quantity"
                   onChangeText={setQuantity}
                   value={quantity}>
        </TextInput>
        <TouchableOpacity style={styles.add} onPress={onSubmitHandler}>
          <Ionicons name="add-circle" color="#95B8D1" size="65" />
        </TouchableOpacity>

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

import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import CurrentFoodDisplay from '../components/CurrentFoodDisplay'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../config/colours";


function CurrentFood({navigation}) {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("current")
      .onSnapshot((querySnapShot) => {
        const newList = [];
        querySnapShot.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id });
        });
        setFood(newList);
      });

    return unsubscribe;
  }, [food, setFood]);

  const dateFormat = (date) => {
    const [day, month, year] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return day.toString() + " " + months[month] + " " + year.toString();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 30, alignSelf: "center", marginBottom: 10, fontWeight: 'bold', color: colours.littleBoyBlue }}>
        Welcome, {auth.currentUser.displayName}{" "}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Your current list of food
      </Text>

      <ScrollView style={styles.scroll}>
        {food.map((item) => (
            <CurrentFoodDisplay
                food= {item.food}
                expiry= {dateFormat(new Date(item.expiry.seconds*1000))} //{new Date(item.expiry.seconds*1000).toString()}
                price= {item.price}
                quantity= {item.quantity}
                eaten= {item.eaten}
                id={item.id}
            />
        ))}
      </ScrollView>


     
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Food Input")}
      >
        <MaterialCommunityIcons
          name="plus-thick"
          size={30}
          color="white"
          style={{ alignSelf: "flex-end" }}
        />
      </TouchableOpacity>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    padding: 10,
    backgroundColor: colours.cameoPink,
    borderRadius: 50,
    alignSelf: "flex-end",
    bottom: 20,
    right: 20,
  },
  container: {

    marginTop: 50,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },

  scroll: {
    //backgroundColor: 'black',
    height: 300,
    width: 420,
  }
});

export default CurrentFood;
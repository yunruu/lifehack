import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth, db } from "../config/firebase";
import CurrentFoodDisplay from '../components/CurrentFoodDisplay'

function CurrentFood(props) {
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

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, alignSelf: "center", marginBottom: 10 }}>
        Welcome, {auth.currentUser.displayName}{" "}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Your current list of food
      </Text>
      <ScrollView style={styles.scroll}>
        {food.map((item) => (
            <CurrentFoodDisplay
                food= {item.food}
                expiry= {item.expiry}
                price= {item.price}
                quantity= {item.quantity}
                eaten= {item.eaten}
                id={item.id}
            />
        ))}
      </ScrollView>
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
  },

  scroll: {
    //backgroundColor: 'black',
    height: 300,
    width: 420,
  }
});

export default CurrentFood;
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { auth, db } from "../config/firebase";

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
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Your current list of food
      </Text>
      {food.map((item) => {
        return (
          <View id={item.id}>
            <Text></Text>
          </View>
        );
      })}
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
});

export default CurrentFood;

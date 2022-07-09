import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import colours from "../config/colours";

function FunFact(props) {
  const fact = [
    "In 2019, Singapore generated around 744 million kg of food waste.",
    "Food waste makes up half of the 1.5kg of waste discarded daily by Singaporean households",
    "From 2007 to 2017, the amount of food waste in Singapore jumped from 558,000 tonnes to 810,000 tonnes.",
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Did you know?</Text>
      {fact.map((text) => {
        return (
          <View style={styles.list} key={text}>
            <Text style={{ padding: 20 }}>{text}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    alignItems: "center",
  },
  list: {
    backgroundColor: colours.honeyDew,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 20,
    margin: 10,
  },
});

export default FunFact;

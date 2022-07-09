import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import FoodInput from "./pages/FoodInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CurrentFood from "./pages/CurrentFood";
import ExpiredFood from "./pages/ExpiredFood";
import FunFact from "./pages/FunFact";
import colours from "./config/colours";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="ProfilePage" component={MyTabs} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colours.littleBoyBlue,
        },
        unmountOnBlur: true,
        tabBarActiveTintColor: colours.cameoPink,
        tabBarInactiveTintColor: colours.middleBlueGreen,
        tabBarStyle: {
          backgroundColor: colours.littleBoyBlue,
          height: 60,
          paddingBottom: 2,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Current"
        component={CurrentFood}
        options={{
          tabBarLabel: "Food",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expired"
        component={ExpiredFood}
        options={{
          tabBarLabel: "Expired",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="emoticon-sad"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fun Facts"
        component={FunFact}
        options={{
          tabBarLabel: "Fun Fact",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-lightbulb"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

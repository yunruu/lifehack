import React from "react";
import React, { useState } from "react";
import { auth, db } from "../config/Firebase";
import { BlueButton } from "../config/reusable";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
// import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';

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
    <View style={styles.container}>
        <BlueButton 
            style={styles.editProfileButton}
            text='Edit Profile'
            onPress={() => navigation.navigate("EditProfileScreen")}
        />
        <StatusBar style="auto" />
        <Image style={styles.displayPic} source={require('../assets/icon.png')}/>
        <Text style={styles.username}> Hello, {auth.currentUser.displayName}</Text> 

        <Text style={styles.profileText}> Points: 50 </Text> 
        <Text style={styles.profileText}> Status: Beginner </Text> 
      <BlueButton 
        style={styles.logoutButton} 
        text={"LOG OUT"} 
        onPress={() => handleLogout()} 
      />
    </View>
  );
}

// Based on points (every 50 points?), status will change (Beginner, Amateur, Intermediate, Professional, Senior, Expert, Ambassador)

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  displayPic: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    marginTop: 60,
    marginBottom: 60,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    justifyContent: 'center',
    //textTransform: 'uppercase',
  },
  profileText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#D6EADF',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  editProfileButton: {
    borderColor: '#D6EADF',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 50,
    marginLeft: 280,
    marginVertical: 10,
    height: 20,
    width: 110
  },

  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
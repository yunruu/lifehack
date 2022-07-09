import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
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

  const [point, setPoint] = useState("");
  const [status, setStatus] = useState("");
  // const getPoints = async() => {
  //   const res = db.collection("users").doc(auth.currentUser.uid);
  //   const data = await res.get();
  //   data.then(doc => {
  //     setPoint(doc.data().points)
  //   })
  
  var points = db.collection("users").doc(auth.currentUser.uid);
  var currPoint = 0;

  points.get().then((doc) => {
    setPoint(doc.data().points);
    currPoint = doc.data().points;

    if (currPoint <= 100) {
      setStatus("Beginner");
    } else if (currPoint <= 300) {
      setStatus("Amateur");
    } else if (currPoint <= 500) {
      setStatus("Intermediate");
    } else if (currPoint <= 800) {
      setStatus("Professional");
    } else if (currPoint <= 1200) {
      setStatus("Senior");
    } else if (currPoint <= 1500) {
      setStatus("Expert");
    } else if (currPoint <= 1800) {
      setStatus("Master");
    } else {
      setStatus("Ambassador");
    }

    }).catch((error) => {
    console.log("Error getting document:", error);
  });

  return (
    <View style={styles.container}>
        <BlueButton 
            style={styles.editProfileButton}
            text='Edit Profile'
            textStyle={styles.editProfileText}
            onPress={() => {
              navigation.navigate("EditProfileScreen")}
            }
        />
        <StatusBar style="auto" />
        <Image style={styles.displayPic} source={require('../assets/astro.jpg')}/>
        <Text style={styles.username}> {auth.currentUser.displayName}</Text> 
        <Text style={styles.profileText}> Points: {point} </Text> 
        <Text style={styles.profileText}> Status: {status} </Text> 
      <BlueButton 
        style={styles.logoutButton} 
        text={"LOG OUT"} 
        onPress={() => handleLogout()} 
        textStyle={styles.logoutText}
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
  },
  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#D6EADF',
    paddingVertical: -1, 
    textAlign: 'center',
    borderRadius: 900,
    marginBottom: 0,
  },

  editProfileButton: {
    borderColor: '#D6EADF',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 50,
    marginHorizontal: 50,
    marginLeft: 280,
    marginVertical: 10,
    height: 20,
    width: 110
  },

  editProfileText: {
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 0,
    color: '#EAC4D5'
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

import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { BlueButton } from "../config/reusable";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from 'react-native-community/async-storage';

// import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';

function EditProfileScreen({ navigation }) {

  const [name, setName] = useState("");
  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const updateName = async() => {
    if (name == "") {
      alert("Enter new username!");
    } else {
      try {
        auth.currentUser.updateProfile({
          displayName: name
        });
        console.log("Name changed successfully.")
      } catch (e) {
        console.log("Update Name Failed. Try Again.", e)
      }
    }
  }

  return (
    <View style={styles.container}>
        <BlueButton 
            style={styles.editProfileButton}
            text='Return'
            onPress={() => {
              navigation.navigate("ProfilePage")}
            }
            textStyle={styles.returnButton}
        />
        <StatusBar style="auto" />
        <Image style={styles.displayPic} source={require('../assets/astro.jpg')}/>
        
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View> */}

        <TextInput
        style={styles.nameInput}
        placeholder="New Username"
        onChangeText={setName}
        value={name}
        ></TextInput>

      <BlueButton 
        style={styles.submitButton} 
        text={"SUBMIT"} 
        onPress={() => updateName().then(() => {navigation.navigate("ProfilePage")})} 
        textStyle={styles.submitButton}
      />
    </View>
  );
}

export default EditProfileScreen;

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
  nameInput: {
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 40, 
    backgroundColor: "#f9f9f9",
  },
  profileText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  returnButton: {
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 30,
    color: '#EAC4D5',
    },
  submitButton:{
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#D6EADF',
    padding: 0, 
    textAlign: 'center',
    borderRadius: 900,
  },
  editProfileButton: {
    borderColor: '#D6EADF',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 50,
    marginTop: 50,
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
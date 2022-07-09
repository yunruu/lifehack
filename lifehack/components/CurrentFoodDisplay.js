import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../config/Firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default CurrentFoodDisplay = ({food, expiry, price, quantity, eaten, id}) => {
    const onDeleteHandler = async (id) => {
        db.collection('users')
        .doc(auth.currentUser.uid)
        .collection("current")
        .doc(id)
        .delete()
        .then(res => {
           console.log('Product deleted Successfully');
         })
        .catch((error) => {
           console.error('Error removing document: ', error);
        }); 

        const usersRef = db.collection('users').doc(auth.currentUser.uid);
        usersRef.update({
           points: firebase.firestore.FieldValue.increment(50)
        })
    };

  return (
    <View style={styles.display}>
      <View style={styles.innerdisplay}>
        <TouchableOpacity style={styles.tick}
                          onPress={() => onDeleteHandler(id)}>
            <Ionicons name="checkmark-circle-outline" color="#95B8D1" size="55" />
        </TouchableOpacity>
        <View>
            <Text style={styles.food}>{food}</Text>
            <Text style={styles.expiry}>{expiry}</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    display: {
        backgroundColor: 'white',
        width: 350,
        height: 120,
        borderRadius : 10,
        alignSelf: 'center',
        marginBottom: 20
    },

    tick: {
        marginLeft: -50,
        marginTop: 25
    },

    innerdisplay: {
        flexDirection: 'row',
        justifyContent:'center'
    }, 

    food: {
        marginTop: 25,
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20
    },

    expiry: {
        marginLeft: 15,
        marginTop: 5
    }

})
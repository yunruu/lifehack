import { FlatList, SafeAreaView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/Firebase';
import colours from '../config/colours';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ExpiredFood() {
    const [wastedFood, setWastedFood] = useState([]);
    const { currentUser } = auth;

    useEffect(() => {
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.uid)
            .collection("current")
            .where("expiry", "<", new Date())
            .onSnapshot((querySnapShot) => {
                const expiredFoodList = [];
                querySnapShot.forEach((doc) => {
                expiredFoodList.push({ ...doc.data(), id: doc.id });
                });
                setWastedFood(expiredFoodList);
        });

        return unsubscribe;
    }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <MaterialCommunityIcons name="food-off" color={colours.cameoPink} size={30}></MaterialCommunityIcons>
        <Text style={{paddingLeft: 15, paddingBottom: 15, fontSize: 30, fontWeight: 'bold', color: colours.littleBoyBlue}}>Wastage</Text>
        </View>
        <FlatList 
        vertical
        showsVerticalScrollIndicator={false}
        data={wastedFood}
        renderItem={listItem}
        />
    </SafeAreaView>
  )
}

const listItem = ({item}) => {
    return (
    <View style={{backgroundColor: colours.honeyDew, borderBottomColor: colours.middleBlueGreen, borderBottomWidth: 1, paddingVertical: 20, paddingHorizontal: 10,
    flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{overflow: 'visible', fontSize: 20, color: colours.littleBoyBlue}}>{item.food}</Text>
        <Text style={{overflow: 'visible', fontSize: 20, color: colours.littleBoyBlue}}>{item.price}</Text>
    </View>
    );
};
import { FlatList, SafeAreaView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase';
import colours from '../config/colours';
import moment from 'moment';

export default function ExpiredFood() {
    const [wastedFood, setWastedFood] = useState([]);
    const { currentUser } = auth;

    useEffect(() => {
      const currentDate = moment().format("DD-MM-YYYY").split("-");
      const currentDay = currentDate[0];
      const currentMonth = currentDate[1];
      const currentYear = currentDate[2];
      
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

    /*const wastedFood = [
        {
            foodName: 'bananas',
            foodPrice: '$1.50'
        },
        {
            foodName: 'strawberries',
            foodPrice: '$4'
        }
    ]*/

  return (
    <View style={{backgroundColor: 'white', flex: 1, }}>
        <FlatList 
        vertical
        showsVerticalScrollIndicator={false}
        data={wastedFood}
        renderItem={listItem}
        />
    </View>
  )
}

const listItem = ({item}) => {
    return (
    <View style={{backgroundColor: colours.honeyDew, borderBottomColor: colours.middleBlueGreen, borderBottomWidth: 1, paddingVertical: 20, paddingHorizontal: 10,
    flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{overflow: 'visible', fontSize: 20, color: colours.littleBoyBlue}}>{item.food}</Text>
        '<Text style={{overflow: 'visible', fontSize: 20, color: colours.littleBoyBlue}}>{item.price}</Text>
    </View>
    );
};

'use strict';

// Import React and Component
import React, {useEffect, useState, Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import OrderSouvenirComponent from '../components/OrderSouvenirComponent';

import { baseUrl } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();


const CartScreen  = () => {
  const [souvenirs, setSouvenirs] = useState([]);

  useEffect(() => {
      AsyncStorage.getItem('token').then(token => {
          fetch(baseUrl + 'souvenirorders', {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
              .then(res => res.json())
              .then(res => {
                  setSouvenirs(res['orders']);
              })
          console.log(souvenirs);
      });
  }, [])
  return (
      <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
              {souvenirs.map((souvenir) =>
                  <OrderSouvenirComponent key={souvenir.OrderId} souvenir={souvenir} />
              )}
          </ScrollView>
      </SafeAreaView>
  );
};


const cartScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerRight: () => (
          <View>
              <UserButton navigationProps={navigation} />
              <TicketButton navigationProps={navigation} />
          </View>
        ),
        headerStyle: {
          backgroundColor: '#F9A606', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        headerTitleAlign: 'center',

      }}>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
export default cartScreenStack;

const styles = StyleSheet.create({
  souvenir: {
    flexDirection: 'row',
    
  },
  text: {
    marginLeft: 20,
  }
})
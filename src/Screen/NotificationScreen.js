

// Import React and Component
import React, { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import AsyncStorage from '@react-native-community/async-storage'; 
import { baseUrl } from '../../config';
import NotificationComponent from '../components/NotificationComponent';

const Stack = createStackNavigator();


const NotificationScreen = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      fetch(baseUrl + 'notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw res;
        }
      })
      .then((res) => res.json())
      .then((res) => {
        setNotification(res['notifications']);
        console.log(res['notifications']);
      })
      .catch(error => {
        error.json()
          .then(body => {
            alert(body.message);
          })
  
      });
    });
    
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {notification.map((notification) =>
          <NotificationComponent key={notification.NotificationId} notification={notification} setNotification={setNotification} /> 
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const notificationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerRight: () => (
          <UserButton navigationProps={navigation} />
        ),
        //headerShown: false,
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
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notification', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
export default notificationScreenStack;
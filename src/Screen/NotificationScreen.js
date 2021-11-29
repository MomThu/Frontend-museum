

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import Header from '../components/HeaderComponent';

const Stack = createStackNavigator();

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            
            This is the Notification Screen
          </Text>
        </View>
        
        
      </View>
    </SafeAreaView>
  );
};

const notificationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerRight: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerShown: false,
        headerStyle: {
          backgroundColor: '#F9A606', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
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


// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

import bottomTab from '../navigation/bottomTab';

const Stack = createStackNavigator();

const InformationScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
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
            
            This is the Information Screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const informationScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="InformationScreen"
        screenOptions={{
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F9A606', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="InformationScreen"
          component={InformationScreen}
          options={{
            title: 'Information', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

export default informationScreenStack;
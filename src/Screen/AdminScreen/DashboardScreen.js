

// Import React and Component
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

import TicketChart from '../../components/TicketChartComponent'
import OrderChart from '../../components/OrderChartComponent';
const Stack = createStackNavigator();

const DashboardScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, padding: 16}}>
        <TicketChart />
        <OrderChart />
      </ScrollView>
    </SafeAreaView>
  );
};

const dashboardScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
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
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
export default dashboardScreenStack;

const styles = StyleSheet.create({
  souvenir: {
    flexDirection: 'row',
    
  },
  text: {
    marginLeft: 20,
  }
})
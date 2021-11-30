

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';

const Stack = createStackNavigator();

const CartScreen = () => {
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
            
            This is the Cart Screen
          </Text>
        </View>
        
        
      </View>
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
          title: 'Cart', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
export default cartScreenStack;


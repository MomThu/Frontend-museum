

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
//import CalendarPicker from 'react-native-calendar-picker';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

const Stack = createStackNavigator();

const TicketScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View>
          <Text>
            Event Ticket
          </Text>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

const ticketScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="TicketScreen"
        screenOptions={{
          headerRight: () => (
            //<NavigationDrawerHeader navigationProps={navigation} />
            <HomeButton navigationProps={navigation} />
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
          name="TicketScreenChild"
          component={TicketScreen}
          options={{
            title: 'Ticket', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

export default ticketScreenStack;
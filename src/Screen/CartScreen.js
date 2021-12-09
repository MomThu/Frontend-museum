

// Import React and Component
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import AsyncStorage from '@react-native-community/async-storage';
import SouvenirComponent from '../components/SouvenirComponent';

const Stack = createStackNavigator();

const CartScreen = () => {
  const [souvenirs, setSouvenirs] = useState([])
  useEffect( () => {
    async function getSouvenir() {
      var souvenir = await AsyncStorage.getItem('souvenir');
      souvenir = JSON.parse(souvenir);
      console.log(souvenir);
      setSouvenirs(souvenir);
      console.log(souvenirs);
    }
    getSouvenir()
  }, []);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View>
          {souvenirs.map(souvenir => 
          <View style={styles.souvenir}>
            <Text>{souvenir.Name}</Text>
            <Text style={styles.text}>{souvenir.Price}$</Text>
          </View>
          )}
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

const styles = StyleSheet.create({
  souvenir: {
    flexDirection: 'row',
    
  },
  text: {
    marginLeft: 20,
  }
})


// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

const Stack = createStackNavigator();

const UserScreen = () => {
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
            
            This is the User Screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const userScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="UserScreen"
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
          name="UserScreenChild"
          component={UserScreen}
          options={{
            title: 'User', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

export default userScreenStack;
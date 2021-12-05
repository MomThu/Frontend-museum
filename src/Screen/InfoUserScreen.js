

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

const Stack = createStackNavigator();

const InfoUserScreen = ({navigation}) => {
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

const infoUserScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="InfoUserScreen"
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
          name="InfoUserScreenChild"
          component={InfoUserScreen}
          options={{
            title: 'Thông tin cá nhân', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

export default infoUserScreenStack;
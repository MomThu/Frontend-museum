

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert, Image, StyleSheet} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const UserScreen = ({navigation}) => {
  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure? You want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            AsyncStorage.clear();
            navigation.replace('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.imageStyle} source={require('../assets/icons/user.png')} />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: "black"
            }}>
              User
          </Text>
        </View>
        <View style={styles.contentStyle}>
          {/* <TouchableOpacity onPress={() => navigation.replace("InfoUserScreen")}>
            <Text>Thông tin cá nhân</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.replace("InfoUserScreen")}>
            <Text style={styles.textStyle}>Yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("OrderTicketScreen")}>
            <Text style={styles.textStyle}>Danh sách vé đặt</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
  },
  contentStyle: {
    margin: 20,
    borderBottomColor: '#000'
  },
  textStyle: {
    color: 'black'
  }
})


// Import React and Component
import React, { useState, createRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, Image, StyleSheet, Button, TextInput, Modal, Pressable, ScrollView } from 'react-native';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../../config';

const Stack = createStackNavigator();

const UserScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renew, setReNew] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const loggingout = async () => {
    GoogleSignin.configure({
      androidClientId: '887856300691-2gqc0lj4t22s89j7bnrcntp4170veo05.apps.googleusercontent.com',
      //offlineAccess: true
    });
    const isGoogleLogin = await GoogleSignin.isSignedIn();
    console.log(isGoogleLogin);
    if (isGoogleLogin) {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        console.log('vaodaychua');
        // Removing user Info
      } catch (error) {
        console.error(error);
      }
    }
    AsyncStorage.clear();
    props.navigation.replace('Auth');
  }
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
          onPress: () => loggingout(),
        },
      ],
      { cancelable: false },
    );
  }

  const changePass = () => {
    const dataToSend = {
      password: password,
      newpassword: newPassword,
      renewpassword: renew,
    }
    AsyncStorage.getItem('token').then(token => {
      fetch(baseUrl + 'changepass', {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.ok) {
            setModalVisible(false);
            return res;
          } else {
            throw res;
          }
        })
        .then((res) => res.json())
        .then(res => {
          alert(res.msg);
        })
        .catch(error => {
          error.json()
            .then(body => {
              alert(body.msg);
            })
  
        });
    })
    
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.imageStyle} source={require('../assets/icons/user.png')} />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: "black"
            }}>
            User
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.ChangePassword}>?????i m???t kh???u</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder='M???t kh???u'
                  placeholderTextColor='black'
                  underlineColorAndroid="#000"
                />
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder='M???t kh???u m???i'
                  placeholderTextColor='black'
                  underlineColorAndroid="#000"
                />
                <TextInput
                  value={renew}
                  onChangeText={setReNew}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder='Nh???p l???i m???t kh???u'
                  placeholderTextColor='black'
                  underlineColorAndroid="#000"
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={changePass}>
                  <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>

        </View>
        <View style={styles.contentStyle}>
          <TouchableOpacity onPress={() => navigation.replace("OrderTicketScreen")}>
            <Text style={styles.textStyle}>Danh s??ch v?? ?????t</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("OrderSouvenirScreen")}>
            <Text style={styles.textStyle}>Danh s??ch ????n ?????t</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const userScreenStack = ({ navigation }) => {
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
          title: 'Ng?????i d??ng', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

export default userScreenStack;

const styles = StyleSheet.create({
  ChangePassword:{
    color: '#595260',
    fontSize: 18
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  contentStyle: {
    margin: 20,
    borderBottomColor: '#000'
  },
  textStyle: {
    padding: 8,
    color: 'black',
    fontSize: 18
  },
  modalView: {
    height: 700,
    width: '90%',
    marginVertical: "15%",
    backgroundColor: "#FFFCDC",
    flexWrap: 'wrap',
    borderRadius: 20,
    padding: 35,
    marginLeft: 20
  },
  input: {
    marginLeft: 20,
    color: 'black'
  },
  buttonStyle: {
    marginTop: 35,
    marginLeft: 95,
    backgroundColor:'green',
    width: 60,
    height: 30,
    borderRadius: 7,
    textAlign: 'center'
  },
  buttonTextStyle:{
    marginTop: 5,
    marginLeft: 2,
    color: 'white',
    width: 55,
    height: 30,
    textAlign: 'center'
  },
  buttonClose:{
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 250
  },
  // inputStyle: {
  //   flex: 1,
  //   color: '#000',
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderWidth: 1,
    
  //   borderColor: '#dadae8',
  // },
})
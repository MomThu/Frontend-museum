

// Import React and Component
import React, { useState } from 'react';
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
            <Text style={styles.ChangePassword}>Đổi mật khẩu</Text>
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
                  placeholder='Mật khẩu'
                />
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  placeholder='Mật khẩu mới'
                />
                <TextInput
                  value={renew}
                  onChangeText={setReNew}
                  style={styles.input}
                  placeholder='Nhập lại mật khẩu'
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
            <Text style={styles.textStyle}>Danh sách vé đặt</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("OrderSouvenirScreen")}>
            <Text style={styles.textStyle}>Danh sách đơn đặt</Text>
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
          title: 'Người dùng', //Set Header Title
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
    height: '80%',
    width: '90%',
    marginVertical: "10%",
    backgroundColor: "white",
    flexWrap: 'wrap',
    borderRadius: 20,
    padding: 35,
    marginLeft: 20
  },
  input: {
    marginLeft: 80,
  },
  buttonStyle: {
    marginTop: 28,
    marginLeft: 95,
    backgroundColor:'blue',
    width: 60,
    height: 30,
    borderRadius: 7
  },
  buttonTextStyle:{
    marginTop: 5,
    marginLeft: 2,
    color: 'white',
    width: 55,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonClose:{
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 250
  }
})
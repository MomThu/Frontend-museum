import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, ScrollView, Touchable, TouchableOpacity, Button, Modal, Pressable, Image } from "react-native";
import SouvenirComponent from "../components/SouvenirComponent";

import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import AsyncStorage from "@react-native-community/async-storage";
import CalendarStrip from 'react-native-calendar-strip';
import PushNotification from 'react-native-push-notification';

import { baseUrl } from "../../config";
const Stack = createStackNavigator();

const ShowSouvenirScreen = ({ navigation }) => {
  //Khoi tao
  const [souvenirs, setSouvenirs] = useState([])
  const [date, setDate] = useState(new Date().toISOString());
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      fetch(baseUrl + 'souvenirs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.ok) {
            return res;
          } else {
            throw res;
          }
        })
        .then((res) => res.json())
        .then((res) => {
          var kq = res['souvenirs'];
          for (let i = 0; i < kq.length; i++) {
            kq[i]['amount'] = 0;
          }
          console.log(kq);
          setSouvenirs(kq);
        })
        .catch(error => {
          error.json()
            .then(body => {
              console.log(body.message);
              alert(body.message);
            })

        });
    })

  }, [])

  const handleSubmit = () => {
    var totalPrice = 0;
    var orders = [];
    var obj = {};
    for (let i = 0; i < souvenirs.length; i++) {
      if (souvenirs[i]['amount'] !== 0) {
        obj[String(souvenirs[i]['SouvenirId'])] = souvenirs[i]['amount'];
        totalPrice += souvenirs[i]['amount'] * souvenirs[i]['Price'];
      }
    }
    orders.push(obj);
    const dataToSend = {
      orders: orders,
      order_date: date
    }
    console.log(Object.keys(orders[0]));
    const checknull = Object.keys(orders[0]).length == 0 ? 1 : 0;
    console.log(checknull);
    if(checknull || !show) {
      alert("Vui lòng chọn đơn hàng và ngày nhận bạn nhé!");
    } else {
    AsyncStorage.getItem('token').then(token => {
      fetch(baseUrl + 'ordersouvenir', {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.ok) {
            handleNotification();
            return res;
          } 
          else throw res;
        })
        .then(res => res.json())
        .then(res => {
          setImageUrl({ uri: baseUrl + res['urlImage'] });
          setDone(true);
          setModalVisible(!modalVisible);
          console.log(res);
          return
        })
        .catch(error => {
          error.json()
            .then(body => {
              alert(body.message);
            })
        });
    });
  }
  }

  const handleNotification = () => {
    const notification = {
      channelId: "test-channel",
      title: "Đặt hàng thành công",
      message: "Bạn đã đặt hàng thành công",
      bigText: "Tham quan bảo tàng online.",
      color: "red",
    }
    
    PushNotification.localNotification(notification);
    const dataToSend = {
      Title: notification.title,
      Content: notification.message,
    }

    AsyncStorage.getItem('token').then(token => {
      console.log(token);
      fetch(baseUrl + 'notification', {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
          //Header Defination
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => {
          if (res.ok) {
            return res;
          }
          else throw res;
        })
        .catch(error => {
          error.json()
            .then(body => {
              alert(body.message);
            })
        });
    })
  }

  return (
    <ScrollView style={{backgroundColor: '#FBCF8DD9'}}>
      <View>
        <Button onPress={() => setShow(true)} title="Chọn ngày nhận hàng" />
      </View>
      {show && (
        <View>
          <CalendarStrip
            //scrollable
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{ color: 'white' }}
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={new Date().getTime()}
            onDateSelected={(date) => setDate(date.toISOString())}
            daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
          />
        </View>
      )}
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.textStyle}>Đặt hàng</Text>
        <Image source={require('../assets/icons/cart.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Đây là mã QR của bạn. Vui lòng giữ mã của bạn để xác thực vé.</Text>
          {done && <View>
            <Image style={{ width: 100, height: 100 }} source={imageUrl} />
          </View>}
          <Pressable onPress={() => {
            setModalVisible(false);
            setShow(false);
            navigation.replace("OrderSouvenirScreen");
          }}>
            <Text style={styles.textStyle}>Xem danh sách đơn đặt hàng</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible)
              setShow(false);
            }}
          >
            <Text style={styles.textStyle}>CLOSE</Text>
          </Pressable>
        </View>
      </Modal>

      {souvenirs.map((souvenir) =>
        <SouvenirComponent key={souvenir.SouvenirId} souvenir={souvenir} souvenirs={souvenirs} setSouvenirs={setSouvenirs} />
      )}
    </ScrollView>
  );

}

const showSouvenirScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ShowSouvenirScreen"
      screenOptions={{
        headerLeft: () => (
          <HomeButton navigationProps={navigation} />
        ),
        headerRight: () => (
          <View style={styles.HeaderStyle}>
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
        name="ShowSouvenirScreenChild"
        component={ShowSouvenirScreen}
        options={{
          title: 'Souvenir', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

export default showSouvenirScreenStack;

const styles = StyleSheet.create({
  HeaderStyle: {
    flexDirection: 'row'
  },
  TimeStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ButtonStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  modalView: {
    //marginVertical: '80%',
    backgroundColor: "white",
    height: '100%',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: '#000'
  }
})
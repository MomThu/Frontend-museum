
// Import React and Component
import React, { Component } from 'react';
import {View, Text, SafeAreaView, Image, Button, StyleSheet, Pressable, Modal} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import NumericInput from 'react-native-numeric-input';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

import { LocalNotification } from '../services/PushNotification';

const Stack = createStackNavigator();

class TicketScreen extends Component {
  state = {
    modalVisible: false,
    modal2Visible: false,
    selectedDate: new Date().getTime(),
    selectedTime: "",
    amountTicket: 1,
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setModal2Visible = (visible) => {
    this.setState({ modal2Visible: visible });
  }
  onDateSelected = (selectedDate) => {
    this.setState({ selectedDate: selectedDate });
  }
  handleClick = () => {
    LocalNotification();
  }
  
render() {
  const { modalVisible } = this.state;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View>
          <Text>
            Event Ticket
          </Text>
          
        </View>
        <View>
          <CalendarStrip 
            //scrollable
            style={{height:100, paddingTop: 20, paddingBottom: 10}}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            selectedDate={new Date().getTime()}
            onDateSelected={(date) => this.onDateSelected(date.toISOString())}
            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
            
          />
        </View>
        
        <View>
          <Text>Sáng</Text>
          <View style={styles.TimeStyle}>
            <Pressable style={styles.ButtonStyle} onPress={() => {
              this.setModalVisible(!modalVisible)
              this.setState({selectedTime: '9:00'})
              }}>
              <Text>09:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>09:30</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>10:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>10:30</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>11:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>11:30</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text>Chiều</Text>
          <View style={styles.TimeStyle}>
            <Pressable style={styles.ButtonStyle}>
              <Text>09:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>09:30</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>10:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>10:30</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>11:00</Text>
            </Pressable>
            <Pressable style={styles.ButtonStyle}>
              <Text>11:30</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text>Số lượng</Text>
          <NumericInput type='up-down' minValue={0} onChange={(value) => this.setState({amountTicket: value})}/>
        </View>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Thông tin vé</Text>
              <Text>Tour tham quan bảo tàng bắt đầu từ {this.state.selectedTime}</Text>
              <Text>Selected Date: {this.state.selectedDate}</Text>
              <Text>Giá vé: 65000đ</Text>
              <Text>Số lượng vé: {this.state.amountTicket}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
              <Pressable style={styles.ButtonStyle} onPress={() => {
              this.setModalVisible(!modalVisible)
              this.setModal2Visible(!this.state.modal2Visible)
              this.handleClick()
              }}>
              <Text>Đặt vé</Text>
            </Pressable>
            </View>
        </Modal>

        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modal2Visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModal2Visible(!this.state.modal2Visible);
          }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Đặt vé thành công</Text>
              <Text>Số lượng vé: {this.state.amountTicket}</Text>
              <Text>Giá tiền: {65*this.state.amountTicket}000đ</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModal2Visible(!this.state.modal2Visible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
}

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

const styles = StyleSheet.create({
  TimeStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ButtonStyle: {
    color: '#000',
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
    marginVertical: '100%',
    backgroundColor: "white",
    height: '20%',
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
})
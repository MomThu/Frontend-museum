
// Import React and Component
import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, Button, StyleSheet, Pressable, Modal } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import NumericInput from 'react-native-numeric-input';
import { useNavigation } from '@react-navigation/native';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import PushNotification from 'react-native-push-notification';
//import { LocalNotification } from '../services/PushNotification';
import { baseUrl } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import Momo from './MomoScreen';

const Stack = createStackNavigator();

class TicketScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modal2Visible: false,
      modal3Visible: false,
      selectedDate: new Date().toISOString(),
      selectedTime: "",
      amountTicket1: 0,
      amountTicket2: 0,
      amountTicket3: 0,
      total: 0,
      haveData: 0,
      qrImage: "",
      done: false,
      ticketChildrenPrice: 0,
      ticketAdultPrice: 0,
      ticketElderlyPrice: 0,
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setModal2Visible = (visible) => {
    this.setState({ modal2Visible: visible });
  }
  setModal3Visible = (visible) => {
    this.setState({ modal3Visible: visible });
  }
  onDateSelected = (selectedDate) => {
    this.setState({ selectedDate: selectedDate });
  }
  convertTime = (time) => {
    var date = new Date(Date.parse(time));
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
  }

  componentDidMount() {
    fetch(baseUrl + 'orderticket')
      .then(res => {
        if (res.ok) return res;
        else throw res;
      })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          ticketChildrenPrice: res['artifacts'][0].Price,
          ticketAdultPrice: res['artifacts'][1].Price,
          ticketElderlyPrice: res['artifacts'][2].Price
        })
        console.log(res['artifacts'][0].Price);
      })
      .catch(error => {
        error.json()
          .then(body => {
            alert(body.message);
          })
      });
  }

  handleNotification = () => {
    const notification = {
      channelId: "test-channel",
      title: "B???n ???? ?????t v?? th??nh c??ng",
      message: "B???n ???? ?????t th??nh c??ng v?? ?????n tham quan b???o t??ng v??o ng??y " + this.convertTime(this.state.selectedDate),
      bigText: "Tham quan b???o t??ng online.",
      color: "red",
    }
    const notification2 = {
      channelId: "test-channel",
      title: "L??u ??",
      bigText: "C??n 1 ng??y n???a l?? ?????n s??? ki???n b???n nh??, b???n ch?? ?? ??em theo v?? online ????? v??o b???o t??ng nh??!",
      message: "Tham quan b???o t??ng online.",
      color: "blue",
      //date: new Date(Date.now() + 10 * 1000),
      date: new Date(new Date(Date.parse(this.state.selectedDate)).getTime() - 9360 * 1000)
    }
    PushNotification.localNotification(notification);
    const dataToSend = {
      Title: notification.title,
      Content: notification.message,
    }
    console.log(notification);
    time1 = (new Date(Date.parse(this.state.selectedDate)));
    time2 = (new Date());
    console.log(time1.getHours() + ":" + time1.getMinutes() + "," + time1.getDate());
    console.log(time2.getHours() + ":" + time2.getMinutes() + "," + time2.getDate());

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
          if (res.ok) return res;
          else throw res;
        })
        .then(() => {
          this.setState({ amountTicket1: 0, amountTicket2: 0, amountTicket3: 0 });
        })
        .catch(error => {
          error.json()
            .then(body => {
              alert(body.message);
            })
        });
    })

    PushNotification.localNotificationSchedule(notification2)

  }

  handleSubmit = () => {
    const dataToSend = {
      order_date: this.state.selectedDate,
      children: this.state.amountTicket1,
      adult: this.state.amountTicket2,
      elderly: this.state.amountTicket3,
      total: this.state.total,
    }
    console.log(dataToSend);
    AsyncStorage.getItem('token').then((token) => {
      fetch(baseUrl + 'orderticket', {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })

        .then(res => {
          if (res.ok) {
            return res;
          }
          else throw res;
        })
        .then(res => res.json())
        .then(res => {
          this.setState({ qrImage: { uri: baseUrl + res['urlImage'] } });
          console.log(res);
          return
        })
        .catch(error => {
          error.json()
            .then(body => {
              alert(body.message);
            })
        });
    })
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View>
            <Text style={styles.titleTicket}>
              Vui l??ng ch???n lo???i v?? v???i s??? l?????ng t????ng ???ng ????? ?????t v?? b???n nh??!
            </Text>

          </View>
          <View style={{marginBottom: 14}}>
            <CalendarStrip
              //scrollable
              style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
              calendarColor={'#3343CE'}
              calendarHeaderStyle={{ color: 'white' }}
              dateNumberStyle={{ color: 'white' }}
              dateNameStyle={{ color: 'white' }}
              iconContainer={{ flex: 0.1 }}
              selectedDate={new Date().getTime()}
              onDateSelected={(date) => this.onDateSelected(date.toISOString())}
              daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
            />
          </View>
          <View>
            <View style={styles.TimeStyle}>
              <Text style={styles.textStyleHead}>Lo???i v??</Text>
              {/* <Text style={styles.textStyle}>Gi?? v??</Text> */}
              <Text style={styles.textStyleHead}>S??? l?????ng</Text>
            </View>
            <View style={styles.TimeStyle}>
              <Pressable style={styles.ButtonStyle}>
                <Text style={styles.textStyle}>Tr??? em</Text>
                <Text style={styles.textStyle}>{this.state.ticketChildrenPrice} VN??</Text>
              </Pressable>
              <NumericInput iconStyle={{ color: 'black' }} type='up-down' minValue={0} onChange={(value) => this.setState({ amountTicket1: value })} />
            </View>
            <View style={styles.TimeStyle}>
              <Pressable style={styles.ButtonStyle}>
                <Text style={styles.textStyle}>Ng?????i l???n</Text>
                <Text style={styles.textStyle}>{this.state.ticketAdultPrice} VN??</Text>
              </Pressable>
              <NumericInput iconStyle={{ color: 'black' }} type='up-down' minValue={0} onChange={(value) => this.setState({ amountTicket2: value })} />
            </View>
            <View style={styles.TimeStyle}>
              <Pressable style={styles.ButtonStyle}>
                <Text style={styles.textStyle}>Ng?????i gi??</Text>
                <Text style={styles.textStyle}>{this.state.ticketElderlyPrice} VN??</Text>
              </Pressable>
              <NumericInput iconStyle={{ color: 'black' }} type='up-down' minValue={0} onChange={(value) => this.setState({ amountTicket3: value })} />
            </View>
          </View>

          <View>
            <View style={styles.TimeStyle}>
              <Pressable style={styles.ButtonStyleSubmit} onPress={() => {
                if (this.state.amountTicket1 + this.state.amountTicket2 + this.state.amountTicket3 > 0) {
                  this.setState({ total: this.state.ticketChildrenPrice * this.state.amountTicket1 + this.state.ticketAdultPrice * this.state.amountTicket2 + this.state.ticketElderlyPrice * this.state.amountTicket3 });
                  this.setModalVisible(!modalVisible);
                }
                else {
                  alert("Vui l??ng ch???n s??? l?????ng v?? c???n ?????t!");
                }

              }}>
                <Text style={styles.textStyle}>?????t v??</Text>
              </Pressable>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.textModal}>Th??ng tin v??</Text>
              <Text style={styles.textModal}>Tour tham quan b???o t??ng di???n ra ng??y {this.convertTime(this.state.selectedDate)}</Text>
              <Text style={styles.textModal}>S??? l?????ng v??:</Text>
              <Text style={styles.textModal}>Tr??? em: {this.state.amountTicket1}</Text>
              <Text style={styles.textModal}>Ng?????i l???n: {this.state.amountTicket2}</Text>
              <Text style={styles.textModal}>Ng?????i gi??: {this.state.amountTicket3}</Text>
              <Text style={styles.textModal}>Gi?? ti???n: {this.state.total} VN??</Text>
              <Pressable style={styles.ButtonStyleSubmit} onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
                this.setModal2Visible(!this.state.modal2Visible)
                this.setState({ done: true })
              }}>
                <Text style={styles.textStyle}>Thanh to??n</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.textStyle}>H???y</Text>
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
            {/* <View style={styles.modalView}>
              <Text style={styles.textStyle}>M??n h??nh thanh to??n</Text>
              <Pressable onPress={async () => {
                await this.handleSubmit();
                this.handleNotification();
                this.setModal2Visible(!this.state.modal2Visible);
                this.setModal3Visible(!this.state.modal3Visible)

              }}>
                <Text style={styles.textStyle}>Vui l??ng click v??o ????y ????? thanh to??n</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setModal2Visible(!this.state.modal2Visible)

                }}
              >
                <Text style={styles.textStyle}>H???Y</Text>
              </Pressable>
            </View> */}
            <Momo
              modal2Visible={this.state.modal2Visible}
              modal3Visible={this.state.modal3Visible}
              setModal2Visible={(e) => this.setModal2Visible(e)} 
              setModal3Visible={(e) => this.setModal3Visible(e)} 
              handleSubmit={() => this.handleSubmit()} 
              handleNotification={() => this.handleNotification()}
              total={this.state.total}
              />
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal3Visible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModal3Visible(!this.state.modal3Visible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.textStyle}>????y l?? m?? QR c???a b???n. Vui l??ng gi??? m?? c???a b???n ????? x??c th???c v??.</Text>
              {this.state.done && <View>
                <Image style={{ width: 200, height: 200 }} source={this.state.qrImage} />
              </View>}
              <Pressable onPress={() => {
                // await this.handleSubmit();
                // this.handleNotification();
                this.setModal3Visible(false);
                this.props.navigation.replace("OrderTicketScreen");
              }}>
                <Text style={styles.textStyle}>?????n m??n h??nh thanh to??n</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setModal3Visible(!this.state.modal3Visible)

                }}
              >
                <Text style={styles.textStyle}>CLOSE</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  };
}

const ticketScreenStack = ({ navigation }) => {
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
  textStyleHead: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: '700'
  },
  titleTicket: {
    color: '#000',
    marginBottom: 14
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
    marginVertical: 3,
    marginHorizontal: 10,
  },
  ButtonStyleSubmit: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 4,
    marginVertical: 10,
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
  },
  textModal: {
    color: '#000',
    //fontWeight: 'bold',
    fontSize: 18
  }
})
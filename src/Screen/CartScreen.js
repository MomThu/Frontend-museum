
'use strict';

// Import React and Component
import React, {useEffect, useState, Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, AppRegistry, Linking, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import SouvenirComponent from '../components/SouvenirComponent';

const Stack = createStackNavigator();

// const CartScreen = () => {
//   const [souvenirs, setSouvenirs] = useState([])
//   useEffect( () => {
//     async function getSouvenir() {
//       var souvenir = await AsyncStorage.getItem('souvenir');
//       souvenir = JSON.parse(souvenir);
//       console.log(souvenir);
//       setSouvenirs(souvenir);
//       console.log(souvenirs);
//     }
//     getSouvenir()
//   }, []);
  
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={{flex: 1, padding: 16}}>
//         <View>
//           {souvenirs.map(souvenir => 
//           <View style={styles.souvenir}>
//             <Text>{souvenir.Name}</Text>
//             <Text style={styles.text}>{souvenir.Price}$</Text>
//           </View>
//           )}
//         </View>
        
        
//       </View>
//     </SafeAreaView>
//   );
// };

class CartScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        reactivate={true}
        showMarker={true}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.thu
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  // centerText: {
  //   flex: 1,
  //   fontSize: 18,
  //   padding: 32,
  //   color: '#777'
  // },
  // textBold: {
  //   fontWeight: '500',
  //   color: '#000'
  // },
  // buttonText: {
  //   fontSize: 21,
  //   color: 'rgb(0,122,255)'
  // },
  // buttonTouchable: {
  //   padding: 16
  // }
});

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

// const styles = StyleSheet.create({
//   souvenir: {
//     flexDirection: 'row',
    
//   },
//   text: {
//     marginLeft: 20,
//   }
// })
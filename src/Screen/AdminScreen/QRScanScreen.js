
'use strict';

// Import React and Component
import React, {useEffect, useState, Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, AppRegistry, Linking, TouchableOpacity, ScrollView} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import { baseUrl } from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper';

const Stack = createStackNavigator();

 const QRScanScreen = () => {
   const [scan, setScan] = useState(false);
   const [result, setResult] = useState({});
   const [scanResult, setScanResult] = useState(false);
   const [notscannedTicket, setNotScannedTicket] = useState(false);
   const [notscannedSou, setNotScannedSou] = useState(false);
  const [souvenirs, setSouvenirs] = useState([]);
  
  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    const dataToSend = {
        qrcode: e.data,
    };
    AsyncStorage.getItem('token').then(token => {
        fetch(baseUrl + 'checkorder', {
            method: 'post',
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.ok) return res;
            else throw res;
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            console.log(res['order_detail']);
            if(res['order_detail']) {
              if(res['order_detail'].adult) setNotScannedTicket(true);
              else {
                setNotScannedSou(true);
                const keys = Object.keys(res['order_detail']);
                var objs = [];
                keys.forEach(key => {
                    objs.push({name: key, amount: res['order_detail'][key]})
                });
                console.log(objs);
                setSouvenirs(objs);
              }
            }
            setResult(res);
            setScanResult(true);
            setScan(false);
          })
          .catch(error => {
            error.json()
              .then(body => {
                alert(body.message);
              })
          });
    })
    
  };
 const activeQR = () => {
    setScan(true);
}
const scanAgain = () => {
  setScan(true);
  setScanResult(false);
}
console.log(scanResult);
    return (
      <SafeAreaView>
        <ScrollView>
        <View>
        {!scan && !scanResult &&
                        <View style={styles.cardView} >
                            <TouchableOpacity onPress={() => activeQR()} style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}>Click to Scan !</Text>
                            </TouchableOpacity>

                        </View>
                    }

                    {scanResult &&
                        <View>
                            <Text style={styles.textBold}>Kết quả!</Text>
                            <View style={scanResult ? styles.scanCardView : styles.cardView}>
                                
                                <Text style={styles.textBold}>{result['msg']}</Text>
                                <Text style={styles.textBold}>Ngày bạn đã đăng kí: {result['order_date']}</Text>
                                {notscannedTicket &&
                                <View>
                                  <Text style={styles.textBold}>Người lớn: {result['order_detail'].adult}</Text>
                                <Text style={styles.textBold}>Trẻ em: {result['order_detail'].children}</Text>
                                <Text style={styles.textBold}>Người già: {result['order_detail'].elderly}</Text>
                                </View>
                                }
                                {notscannedSou && 
                                <View>
                                <Text style={styles.labelStyle}>Đơn hàng đã đặt</Text>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ flex: 6, backgroundColor: 'black'}}>Tên</DataTable.Title>
                                        <DataTable.Title style={{ flex: 2, backgroundColor: 'black'}}>Số lượng</DataTable.Title>
                                    </DataTable.Header>
                                    {souvenirs.map(souvenir =>
                                        <DataTable.Row key={souvenir.name}>
                                            <DataTable.Cell style={{ flex: 6, backgroundColor: '#A3423C' }}>{souvenir.name}</DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 2, backgroundColor: '#A3423C' }}>
                                                {souvenir.amount}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                </DataTable>
                            </View>}
                                
                                <TouchableOpacity onPress={() => scanAgain()} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonText}>Click to Scan !</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }

          {scan && 
          <QRCodeScanner
          onRead={onSuccess}
          reactivate={false}
          showMarker={true}
          //ref={(node) => {this.scanner = node}}
          flashMode={RNCamera.Constants.FlashMode.off}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.thu
            </Text>
          }
          bottomContent={
            <View>
            {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
            <Text style={styles.buttonText}>Stop Scan</Text>
        </TouchableOpacity>
        </View>
          }
        />}
        </View>
        </ScrollView>
      </SafeAreaView>
      
    );
  
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

const QRScanScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="QRScanScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
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
        name="QRScanScreen"
        component={QRScanScreen}
        options={{
          title: 'QR Scan', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
export default QRScanScreenStack;

// const styles = StyleSheet.create({
//   souvenir: {
//     flexDirection: 'row',
    
//   },
//   text: {
//     marginLeft: 20,
//   }
// })
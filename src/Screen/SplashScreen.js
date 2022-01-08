// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  ImageBackground, Text
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('role').then((value) => {
        if(value === null) navigation.replace('Auth');
        else {
          console.log(value);
          //if(value === '"0"') navigation.replace('DrawerNavigationRoutesAdmin');
          if(value === '0') navigation.replace('DrawerNavigationRoutesAdmin');
          else navigation.replace('DrawerNavigationRoutes');
        }
      }
        // navigation.replace(
        //   value === null ? 'Auth' : 'DrawerNavigationRoutes'
        // ),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.viewStyles}>
      
      {/* <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      /> */}
      <Text style={styles.textStyles}>Blink Blink</Text>
      <Text style={{fontSize: 20, textAlign: 'center'}}>Ứng dụng tham quan bảo tàng quốc gia Việt Nam</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  viewStyles: {
    backgroundColor: 'orange',
    height: '100%' 
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: '20%'
  },
});


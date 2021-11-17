// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Loader';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  // const handleSubmitPress = () => {
  //   setErrortext('');
  //   if (!userEmail) {
  //     alert('Please fill Email');
  //     return;
  //   }
  //   if (!userPassword) {
  //     alert('Please fill Password');
  //     return;
  //   }
  //   setLoading(true);
  //   let dataToSend = {email: userEmail, password: userPassword};
  //   let formBody = [];
  //   for (let key in dataToSend) {
  //     let encodedKey = encodeURIComponent(key);
  //     let encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   fetch('http://localhost:3000/api/user/login', {
  //     method: 'POST',
  //     body: formBody,
  //     headers: {
  //       //Header Defination
  //       'Content-Type':
  //       'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === 'success') {
  //         AsyncStorage.setItem('user_id', responseJson.data.email);
  //         console.log(responseJson.data.email);
  //         navigation.replace('DrawerNavigationRoutes');
  //       } else {
  //         setErrortext(responseJson.msg);
  //         console.log('Please check your email id or password');
  //       }
  //     })
  //     .catch((error) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };
  const handleSubmitPress = () => {
    navigation.replace('DrawerNavigationRoutes');
  }

  return (
    <View style={styles.mainBody}>
      
      <Loader loading={loading} />
      <ImageBackground source={require('../assets/anh2.png')} style={styles.image}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
        
          <KeyboardAvoidingView enabled>
            
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) =>
                  setUserName(UserName)
                }
                placeholder="Username" 
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#F9A606',
    borderWidth: 0,
    color: '#000',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  registerStyle: {
    backgroundColor: '#fff',
    borderWidth: 2,
    color: '#000',
    borderColor: '#F9A606',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 0,
    marginBottom: 25,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});
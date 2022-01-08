// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
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
  Modal, Pressable
} from 'react-native';
import {
  GoogleSignin, GoogleSigninButton, statusCodes
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import Loader from './Loader';
import { baseUrl } from '../../config';

const required = (val) => val && val.length;


const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const passwordInputRef = createRef();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    createChannels();
    GoogleSignin.configure({
      androidClientId: '887856300691-2gqc0lj4t22s89j7bnrcntp4170veo05.apps.googleusercontent.com',
      //offlineAccess: true
    });
  }, [])
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel"
      },
      (created) => console.log(`createChannel returned '${created}'`)
    )
  }
  const handleSubmitPress = () => {
    setErrortext('');
    if (!required(userEmail)) {
      alert('Please fill Email');
      return;
    }
    if (!required(userPassword)) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    const dataToSend = { email: userEmail, password: userPassword };

    fetch(baseUrl + 'login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
      credentials: "same-origin"
    })
      .then(response => {
        setLoading(false);
        if (response.ok) {
          return response;
        } else {
          throw response;
        }
      })
      .then(response => response.json())
      .then((user) => {
        AsyncStorage.setItem('login', 'true');
        AsyncStorage.setItem('role', JSON.stringify(user['role']));
        AsyncStorage.setItem('token', user['access_token']);
        console.log(user['access_token']);
        if (user['role'] == 0) {
          navigation.replace('DrawerNavigationRoutesAdmin');
        } else {
          navigation.replace('DrawerNavigationRoutes');
        }
      })
      .catch(error => {
        setLoading(false);
        error.json()
          .then(body => {
            console.log(body.msg);
            alert(body.msg);
          })

      });
  };
  
  const handleSubmitForgot = () => {
    setErrortext('');
    if (!required(forgotEmail)) {
      alert('Please fill Email');
      return;
    }
    const dataToSend = { email: forgotEmail };
    console.log(dataToSend);
    fetch(baseUrl + 'repass', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setLoading(false);
        if (response.ok) {
          alert("Vui lòng vào email lấy mật khẩu khôi phục!");
          return response;
        } else {
          throw response;
        }
      })
      .catch(error => {
        setLoading(false);
        error.json()
          .then(body => {
            console.log(body.msg);
            alert(body.msg);
          })

      });
  }


  const testSignin = async () => {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          setLoading(true);
          const dataToSend = { email: userInfo.user.email, googleId: userInfo.user.id };
          console.log(dataToSend);
          fetch(baseUrl + 'google', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
              //Header Defination
              'Content-Type': 'application/json',
            },
            credentials: "same-origin"
          })
            .then(response => {
              setLoading(false);
              if (response.ok) {
                return response;
              } else {
                throw response;
              }
            })
            .then(response => response.json())
            .then((user) => {
              AsyncStorage.setItem('login', 'true');
              AsyncStorage.setItem('role', JSON.stringify(user['role']));
              AsyncStorage.setItem('token', user['access_token']);
              console.log(user['access_token']);
              if (user['role'] == 0) {
                navigation.replace('DrawerNavigationRoutesAdmin');
              } else {
                navigation.replace('DrawerNavigationRoutes');
              }
            })
            .catch(error => {
              setLoading(false);
              error.json()
                .then(body => {
                  console.log(body.msg);
                  alert(body.msg);
                })

            });
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })
  }

  const _signOut = async () => {

    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('vaodaychua');
      // Removing user Info
    } catch (error) {
      console.error(error);
    }
  };

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
                  onChangeText={(UserEmail) =>
                    setUserEmail(UserEmail)
                  }
                  placeholder="UserEmail"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  autoComplete='email'
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

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.quen}>Quên mật khẩu?</Text>
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
                    <TextInput
                      style={styles.inputStyle1}
                      onChangeText={(forgotEmail) =>
                        setForgotEmail(forgotEmail)
                      }
                      placeholder="Email"
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      underlineColorAndroid="#f000"
                      onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      autoComplete='email'
                    />
                    <TouchableOpacity
                      style={styles.buttonStyle1}
                      activeOpacity={0.5}
                      onPress={handleSubmitForgot}>
                      <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                    </TouchableOpacity>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={{color: 'black', marginTop: 5}}>CLOSE</Text>
                    </Pressable>

                  </View>
                </ScrollView>
              </Modal>

              <TouchableOpacity
                style={styles.registerStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
              {/* <Text style={{textAlign: 'center'}} >OR</Text> */}
              <GoogleSigninButton
                style={{ width: 300, height: 48, marginLeft: 45 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={testSignin}
              />
            </KeyboardAvoidingView>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  buttonClose: {
    backgroundColor: 'red',
    height: 30,
    borderRadius: 7
  },
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
  buttonStyle1:{
    backgroundColor: '#F9A606',
    borderWidth: 0,
    color: '#000',
    height: 40,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 200,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 25,
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
    fontSize: 15,
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
  },
  quen: {
    marginLeft: '60%',
    marginBottom: 20,
    color: '#595260',
    fontSize: 18
  },
  modalView: {
    height: '80%',
    width: '95%',
    marginLeft: 10,
    marginVertical: "10%",
    backgroundColor: "white",
    flexWrap: 'wrap',
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
      color: 'black'
  },
  inputStyle1: {
    backgroundColor: '#FBCF8DD9',
    width: 250,
    borderRadius: 30
  }
});
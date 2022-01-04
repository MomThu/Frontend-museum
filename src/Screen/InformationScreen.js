

// Import React and Component
import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import Header from '../components/HeaderComponent';
import UserButton from '../components/userButton';
import HomeButton from '../components/homeButton';
import bottomTab from '../navigation/bottomTab';

const Stack = createStackNavigator();

const InformationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View>
          <Text style = {{marginBottom: 12, fontSize: 18}}>
            Thông tin bảo tàng
          </Text>
        </View>
        <View>
          <Image style={styles.ImageStyle} source={require('../assets/thongtin.jpg')} />
          <Text style={{fontSize: 16 }}>
            Bảo tàng Lịch sử quốc gia là công trình văn hóa tọa lạc ở khu vực trung tâm của Thủ đô Hà Nội, gần với nhiều di tích linh thiêng của Thủ đô như Tháp Rùa - Hồ Gươm; Cầu Thê Húc - Đền Ngọc Sơn - Bút tháp… Bảo tàng lưu giữ, trưng bày, giới thiệu lịch sử Việt Nam từ thời Tiền sử đến ngày nay thông qua hệ thống tài liệu, hiện vật vô cùng đồ sộ, quý giá, trong đó có nhiều hiện vật là Bảo vật quốc gia.          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const informationScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="InformationScreen"
      screenOptions={{
        headerLeft: () => (
          <HomeButton navigationProps={navigation} />
        ),
        headerRight: () => (
          <UserButton navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F9A606', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          //textAlign: 'center'
        },
        headerTitleAlign: 'center',

      }}>
      <Stack.Screen
        name="InformationScreenChild"
        component={InformationScreen}
        options={{
          title: "My museum"
        }}
      />
    </Stack.Navigator>
  );
};

export default informationScreenStack;

const styles = StyleSheet.create({
  ContentStyle: {
    width: '40%',
    height: 150,
    backgroundColor: 'blue',
    alignItems: "center",
    margin: 10,
    marginTop: 20
  },
  TextStyle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  ImageStyle: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12
  }
})
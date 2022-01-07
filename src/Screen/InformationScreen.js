

// Import React and Component
import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import Header from '../components/HeaderComponent';
import UserButton from '../components/userButton';
import HomeButton from '../components/homeButton';
import bottomTab from '../navigation/bottomTab';

const Stack = createStackNavigator();

const InformationScreen = () => {
  const images = [{
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../assets/baotang.jpg')
    }
  },
  {
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../assets/thongtin.jpg')
    }
  },
  {
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../assets/baotang2.jpg')
    }
  }
  ]
  return (
    
      <View style={{ flex: 1, padding: 16 }}>
        <View>
          <Text style={styles.TextStyleInfo}>
            Giới thiệu chung
          </Text>
        </View>
        <ImageViewer
          imageUrls={images}
        />
        <View>
          <Text style={styles.TextStyle}>
            Bảo tàng Lịch sử quốc gia là công trình văn hóa tọa lạc ở khu vực trung tâm của Thủ đô Hà Nội, gần với nhiều di tích linh thiêng của Thủ đô như Tháp Rùa - Hồ Gươm; Cầu Thê Húc - Đền Ngọc Sơn - Bút tháp… Bảo tàng lưu giữ, trưng bày, giới thiệu lịch sử Việt Nam từ thời Tiền sử đến ngày nay thông qua hệ thống tài liệu, hiện vật vô cùng đồ sộ, quý giá, trong đó có nhiều hiện vật là Bảo vật quốc gia.
          </Text>
          <Text style={styles.TextStyle}>
          Đến với Bảo tàng Lịch sử quốc gia, quý khách sẽ có nhiều trải nghiệm thú vị, hiểu biết thêm về lịch sử văn hóa lâu đời và truyền thống đấu tranh anh dũng, kiên cường trong quá trình dựng nước và giữ nước của dân tộc Việt Nam.
          </Text>
        </View>
      </View>
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
    color: 'black'
  },
  TextStyleInfo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  ImageStyle: {
    width: '100%',
    height: 150,
  }
})
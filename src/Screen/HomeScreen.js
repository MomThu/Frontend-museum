

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button, FlatList, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FBCF8DD9'}}>
      <ScrollView>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {/* <SearchBar placeholder="Search"/> */}
        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("informationScreenStack")}>
          <Image style={styles.ImageStyle} source={require("../assets/anh1.jpg")} />
          <Text
            style={styles.TextStyle}>
            Thông tin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("InformationScreen")}>
          <Image style={styles.ImageStyle} source={require("../assets/anh1.jpg")} />
          <Text
            style={styles.TextStyle}>
            Hiện vật
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("InformationScreen")}>
          <Image style={styles.ImageStyle} source={require("../assets/anh1.jpg")} />
          <Text
            style={styles.TextStyle}>
              Sự kiện
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("InformationScreen")}>
          <Image style={styles.ImageStyle} source={require("../assets/anh1.jpg")} />
          <Text
            style={styles.TextStyle}>
            Lưu niệm
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );

  
  const featuresData = [
    {
        id: 1,
        color: "purple",
        backgroundColor: "lightpurple",
        description: "Top Up"
    },
    // {
    //     id: 2,
    //     icon: icons.send,
    //     color: COLORS.yellow,
    //     backgroundColor: COLORS.lightyellow,
    //     description: "Transfer"
    // },
    // {
    //     id: 3,
    //     icon: icons.internet,
    //     color: COLORS.primary,
    //     backgroundColor: COLORS.lightGreen,
    //     description: "Internet"
    // },
    // {
    //     id: 4,
    //     icon: icons.wallet,
    //     color: COLORS.red,
    //     backgroundColor: COLORS.lightRed,
    //     description: "Wallet"
    // },
    // {
    //     id: 5,
    //     icon: icons.bill,
    //     color: COLORS.yellow,
    //     backgroundColor: COLORS.lightyellow,
    //     description: "Bill"
    // },
    // {
    //     id: 6,
    //     icon: icons.game,
    //     color: COLORS.primary,
    //     backgroundColor: COLORS.lightGreen,
    //     description: "Games"
    // },
    // {
    //     id: 7,
    //     icon: icons.phone,
    //     color: COLORS.red,
    //     backgroundColor: COLORS.lightRed,
    //     description: "Mobile Prepaid"
    // },
    // {
    //     id: 8,
    //     icon: icons.more,
    //     color: COLORS.purple,
    //     backgroundColor: COLORS.lightpurple,
    //     description: "More"
    // },
]
};

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator /*initialRouteName="HomeScreen"*/ >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          
          headerStyle: {
            backgroundColor: '#F9A606', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};


export default homeScreenStack;

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
    height: 120,
  }
})
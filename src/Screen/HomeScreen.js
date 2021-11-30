

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button, FlatList, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FBCF8DD9'}}>
      <ScrollView>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {/* <SearchBar placeholder="Search"/> */}
        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("InformationScreen")}>
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

        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("ShowEventScreen")}>
          <Image style={styles.ImageStyle} source={require("../assets/anh1.jpg")} />
          <Text
            style={styles.TextStyle}>
              Sự kiện
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ContentStyle} onPress={() => navigation.navigate("ShowArtifactScreen")}>
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
};

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator /*initialRouteName="HomeScreen"*/ >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <View style={styles.HeaderStyle}>
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
  HeaderStyle: {
    flexDirection: 'row'
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
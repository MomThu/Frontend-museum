

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { SearchBar } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from './SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
      <View style={{flex: 1, padding: 16}}>
        {/* <SearchBar placeholder="Search"/> */}
        <View style={styles.ContentStyle}>
          <Text
            style={styles.TextStyle}>
            Thông tin
          </Text>
        </View>
        <View style={styles.ContentStyle}>
          <Text
            style={styles.TextStyle}>
            Hiện vật
          </Text>
        </View>
        <View style={styles.ContentStyle}>
          <Text
            style={styles.TextStyle}>
            Sự kiện
          </Text>
        </View>
        <View style={styles.ContentStyle}>
          <Text
            style={styles.TextStyle}>
            Lưu niệm
          </Text>
        </View>
      </View>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        
    </Tab.Navigator> */}
    </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ContentStyle: {
    width: 200,
    height: 200,
    backgroundColor: 'blue',
    alignItems: "center",
    margin: 10,
  },
  TextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  }
})
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import HomeButton from '../components/homeButton';


export default class ShowHienVat extends React.Component {

  render() {
    return (
          <View> Hien Vat 01</View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fbcf8d',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});


// Import React and Component
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import ArtifactComponent from '../components/ArtifactComponent';
import { baseUrl } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import OrderSouvenirComponent from '../components/OrderSouvenirComponent';

const Stack = createStackNavigator();

const OrderSouvenirScreen = () => {
    const [souvenirs, setSouvenirs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            fetch(baseUrl + 'souvenirorders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    setSouvenirs(res['orders']);
                })
        });
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {souvenirs.map((souvenir) =>
                    <OrderSouvenirComponent key={souvenir.OrderId} souvenir={souvenir} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const orderSouvenirScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="OrderSouvenirScreen"
            screenOptions={{
                headerRight: () => (
                    //<NavigationDrawerHeader navigationProps={navigation} />
                    <HomeButton navigationProps={navigation} />
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
                name="OrderSouvenirScreenChild"
                component={OrderSouvenirScreen}
                options={{
                    title: 'Danh sách vé đặt', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

export default orderSouvenirScreenStack;
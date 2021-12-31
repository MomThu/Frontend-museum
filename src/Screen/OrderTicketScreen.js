

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
import OrderTicketComponent from '../components/OrderTicketComponent';
const Stack = createStackNavigator();

const OrderTicketScreen = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            fetch(baseUrl + 'ticketorders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
                .then(res => res.json())
                .then(res => {
                    setTickets(res['orders']);
                })
            console.log(tickets);
        });
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {tickets.map((ticket) =>
                    <OrderTicketComponent key={ticket.OrderId} ticket={ticket} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const orderTicketScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="OrderTicketScreen"
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
                name="OrderTicketScreenChild"
                component={OrderTicketScreen}
                options={{
                    title: 'Danh sách vé đặt', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

export default orderTicketScreenStack;
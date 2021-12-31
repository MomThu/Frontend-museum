import React, { Component, useEffect, useState } from "react";
import {
    View, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";

import homeScreenStack from '../Screen/HomeScreen';
import notificationScreenStack from "../Screen/NotificationScreen";
import cartScreenStack from "../Screen/CartScreen";
import { baseUrl } from "../../config";
const Tab = createBottomTabNavigator();

class bottomTab extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }

    }
    componentDidMount = () => {
        this._isMounted = true;

        const interval = setInterval(() => {
            var unread = 0;
            console.log('This will run every 5 second!');
            AsyncStorage.getItem('token').then((token) => {
                fetch(baseUrl + 'notifications', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        for (let i = 0; i < res['notifications'].length; i++) {
                            if (res['notifications'][i].Unread === false) {
                                unread++;
                            }
                        }
                        if (this._isMounted) {
                            this.setState({ count: unread });
                            
                        }
                        console.log(this.state.count);
                    })

            })
        }, 9000000);
        return () => clearInterval(interval);
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false
                }}
                backBehavior="history"
            >
                <Tab.Screen
                    name="Home"
                    component={homeScreenStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../assets/icons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }} />
                        ),
                    }}

                />

                <Tab.Screen
                    name="Notification"
                    component={notificationScreenStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../assets/icons/notification.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }} />
                        ),
                        tabBarBadge: this.state.count > 0 ? this.state.count : null
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={cartScreenStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('../assets/icons/cart.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
}
export default bottomTab;
import React from "react";
import {
    View, Image, TouchableOpacity, StyleSheet
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import dashboardScreenStack from "../Screen/AdminScreen/DashboardScreen";

const Tab = createBottomTabNavigator();

const bottomTabAdmin = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false
            }}
            backBehavior="history"
        >
            <Tab.Screen
                name="Dashboard"
                component={dashboardScreenStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                        source={require('../assets/icons/home.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }} />
                    )
                }}
               
            />
            
            {/* <Tab.Screen
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
                    )
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
            /> */}
        </Tab.Navigator> 
    )
}
export default bottomTabAdmin;
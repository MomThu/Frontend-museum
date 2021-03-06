

// Import React
import React, {useEffect, useState} from 'react';

// Import Navigators from React Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';


// Import Screens
import homeScreenStack from './HomeScreen';
import settingScreenStack from './SettingsScreen';
import userScreenStack from './UserScreen';
import informationScreenStack from './InformationScreen';
import CustomSidebarMenu from './CustomSidebarMenu';
import bottomTab from '../navigation/bottomTab';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../../config';

const Drawer = createDrawerNavigator();
const DrawerNavigationRoutes = (props) => {
  
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      {/* <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={homeScreenStack}
      /> */}
      <Drawer.Screen 
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        //component={props => <bottomTab {...props} extraData={someData}/>}
        component={bottomTab}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={settingScreenStack}
      />
      {/* <Drawer.Screen
        name="userScreenStack"
        options={{drawerLabel: 'User Screen'}}
        component={userScreenStack}
      /> */}
      {/* <Drawer.Screen
        name="informationScreenStack"
        options={{drawerLabel: () => null}}
        component={informationScreenStack}
      /> */}
    </Drawer.Navigator>
  );
};


export default DrawerNavigationRoutes;



// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';


// Import Screens
import CustomSidebarMenuAdmin from './CustomSidebarMenuAdmin';
import dashboardScreenStack from './DashboardScreen';
import artifactScreenStack from './ArtifactScreen';
import eventScreenStack from './EventScreen';
import bottomTabAdmin from '../../navigation/bottomTabAdmin';

const Drawer = createDrawerNavigator();

const DrawerNavigationRoutesAdmin = (props) => {
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
      drawerContent={CustomSidebarMenuAdmin}>
      <Drawer.Screen
        name="dashboardScreenStack"
        options={{drawerLabel: 'Dashboard'}}
        component={dashboardScreenStack}
      />
      <Drawer.Screen
        name="artifactScreenStack"
        options={{drawerLabel: 'Quản lý hiện vật'}}
        component={artifactScreenStack}
      />
      <Drawer.Screen
        name="eventScreenStack"
        options={{drawerLabel: 'Quản lý sự kiện'}}
        component={eventScreenStack}
      />
    </Drawer.Navigator>
  );
};


export default DrawerNavigationRoutesAdmin;

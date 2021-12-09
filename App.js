import 'react-native-gesture-handler';
// Import React and Component
import React from 'react';
import { LogBox } from 'react-native';


// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './src/Screen/SplashScreen';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import DrawerNavigationRoutes from './src/Screen/DrawerNavigationRoutes';
import informationScreenStack from './src/Screen/InformationScreen';
import settingScreenStack from './src/Screen/SettingsScreen';
import bottomTab from './src/navigation/bottomTab';
import homeScreenStack from './src/Screen/HomeScreen';
import userScreenStack from './src/Screen/UserScreen';
import infoUserScreenStack from './src/Screen/InfoUserScreen';
import ticketScreenStack from './src/Screen/TicketScreen';
import showEventScreenStack from './src/Screen/ShowEventScreent';
import showArtifactScreenStack from './src/Screen/ShowArtifactScreen';
import showSouvenirScreenStack from './src/Screen/SouvenirScreen';

//DrawerNavigationRoutes
const Stack = createStackNavigator();

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" >
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        {/* <Stack.Screen 
          name="bottomTab"
          component={bottomTab} 
          options={{headerShown: false}}
        /> */}
        <Stack.Screen 
          name="InformationScreen"
          component={informationScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="UserScreen"
          component={userScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="InfoUserScreen"
          component={infoUserScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="TicketScreen"
          component={ticketScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ShowEventScreen"
          component={showEventScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ShowArtifactScreen"
          component={showArtifactScreenStack} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ShowSouvenirScreen"
          component={showSouvenirScreenStack} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
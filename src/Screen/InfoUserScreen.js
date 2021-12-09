

// Import React and Component
import React, { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import ArtifactComponent from '../components/ArtifactComponent';

const Stack = createStackNavigator();

const InfoUserScreen = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect( () => {
    async function getSouvenir() {
      var artifact = await AsyncStorage.getItem('artifact');
      artifact = JSON.parse(artifact);
      console.log(artifact);
      setArtifacts(artifact);
      console.log(artifacts);
    }
    getSouvenir()
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View>
          {artifacts.map(artifact => 
          <View>
            <Text>{artifact.Name}</Text>
          </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const infoUserScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="InfoUserScreen"
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
          name="InfoUserScreenChild"
          component={InfoUserScreen}
          options={{
            title: 'Yêu thích', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

export default infoUserScreenStack;
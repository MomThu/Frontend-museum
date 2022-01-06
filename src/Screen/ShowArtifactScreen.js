import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import ArtifactComponent from '../components/ArtifactComponent';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';

import { baseUrl } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

class ShowArtifactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artifacts: [],
      
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('token').then(token => {
      fetch(baseUrl + 'artifacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw res;
        }
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ artifacts: res['artifacts'] })
      })
      .catch(error => {
        error.json()
          .then(body => {
            alert(body.message);
          })
      });
    })
    
  }

  render() {
    const artifacts = this.state.artifacts;

    return (
      <ScrollView style={styles.background}>
        {artifacts.map((artifact) =>
          <ArtifactComponent key={artifact.ArtifactId} artifact={artifact} /> 
        )}
      </ScrollView>

    );
  }

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FBCF8DD9'
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fbcf8d',
    alignItems: 'center',
    justifyContent: 'center',

  },
  HeaderStyle: {
    flexDirection: 'row'
  }
});

const showArtifactScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ShowArtifactScreen"
      screenOptions={{
        headerLeft: () => (
          <HomeButton navigationProps={navigation} />
        ),
        headerRight: () => (
          <View style={styles.HeaderStyle}>
            <UserButton navigationProps={navigation} />
            <TicketButton navigationProps={navigation} />
          </View>

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
        name="ShowArtifactScreenChild"
        component={ShowArtifactScreen}
        options={{
          title: 'Hiện vật', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

export default showArtifactScreenStack;


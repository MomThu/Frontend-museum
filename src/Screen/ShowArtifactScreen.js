import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import ArtifactComponent from '../components/ArtifactComponent';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
const Stack = createStackNavigator();

class ShowArtifactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artifacts: [],
      
    };
  }

  componentDidMount = async () => {
    await fetch('http://10.0.2.2:5000/artifacts')
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
  }

  render() {
    const artifacts = this.state.artifacts;

    return (
      <ScrollView>
        {artifacts.map((artifact) =>
          <ArtifactComponent key={artifact.ArtifactId} artifact={artifact} /> 
        )}
      </ScrollView>

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
          title: 'Artifact', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

export default showArtifactScreenStack;


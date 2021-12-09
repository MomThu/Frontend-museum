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
      artifacts: [

      ],
      image: [
        {url: require('../assets/artifact/1.jpg')},
        {url: require('../assets/artifact/2.jpg')},
        {url: require('../assets/artifact/3.jpg')},
        {url: require('../assets/artifact/4.png')},
      ]
    };
  }

  componentDidMount = async () => {
    await fetch('http://10.0.3.2:5000/artifacts')
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
            console.log(body.message);
            alert(body.message);
          })

      });
  }

  // handleClick = async (event, artifact) => {
  //   console.log(artifact);
  //   //AsyncStorage.setItem('souvenir', souvenir)
  //   var artifacts = await AsyncStorage.getItem('artifact');
  //   //console.log(souvenirs);
  //   if(artifacts === null) {
  //     artifacts = [];
  //   } else {
  //     artifacts = JSON.parse(artifacts);
  //   }
  //   artifacts.push(artifact);
  //   await AsyncStorage.setItem('artifact', JSON.stringify(artifacts));
  //   artifacts = await AsyncStorage.getItem('artifact');
  //   console.log(JSON.parse(artifacts));
  //   //console.log(AsyncStorage.getItem('souvenir'))
  // }

  render() {
    const artifacts = this.state.artifacts;

    return (
      <ScrollView>
        {artifacts.map((artifact, index) =>
          <ArtifactComponent key={artifact.ArtifactId} artifact={artifact} image={this.state.image[index]} /> 
          // <Text>{artifact.Name}</Text>
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


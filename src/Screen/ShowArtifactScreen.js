import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import EventComponent from '../components/EventComponent';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';

const Stack = createStackNavigator();

class ShowArtifactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artifacts: [
      {id: 1, name: 'Đường cách mạng'},
      {id: 2, name: 'Bia đá quốc tử giám'},
      {id: 3, name: 'Trống đồng Cảnh Thịnh'},
      {id: 4, name: 'Bản Thảo lời kêu gọi toàn nước kháng chiến'}
      ]
    };
  }

  render() {
    const { artifacts } = this.state;
    return (
      <ScrollView>
      {artifacts.map(artifact => (
          <EventComponent key = {artifact.id} artifact = {artifacts} />
      ))}
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
});

const showArtifactScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ShowArtifactScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerRight: () => (
          <UserButton navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F9A606', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ShowArtifactScreen"
        component={ShowArtifactScreen}
        options={{
          title: 'Show Artifact', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

export default showArtifactScreenStack;
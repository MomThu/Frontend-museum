import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import EventComponent from '../components/EventComponent';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import { baseUrl } from '../../config';
//import EventComponent from '../components/EventComponent';

const Stack = createStackNavigator();

class ShowEventScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [
          
        ],
        image: [
          {url: require('../assets/event/1.jpg')},
          {url: require('../assets/event/2.jpg')},
          {url: require('../assets/event/3.jpg')},
        ]
      };
    }
  
    componentDidMount = () => {
      fetch(baseUrl + 'events')
        .then((res) => {
          if(res.ok) {
            return res;
          } else {
            throw res;
          }
        })
        .then((res) => res.json())
        .then((res) => {
          this.setState({events: res['events']})
        })
        .catch(error =>  
          {
            error.json()
              .then(body => {
                console.log(body.message); 
                alert(body.message); 
              })
            
          });
    }

    render() {
      const events = this.state.events;
      return (
            <ScrollView style={{backgroundColor: '#FBCF8DD9'}}>
                {events.map((event, index) => (
                    <EventComponent key = {event.EventId} event = {event} image={this.state.image[index]} />
                ))}
            </ScrollView>
      );
    }
    
  }

  
  const showEventScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="ShowEventScreen"
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
          name="ShowEventScreenChild"
          component={ShowEventScreen}
          options={{
            title: 'Show Event', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

  export default showEventScreenStack;

 const styles = StyleSheet.create({
   HeaderStyle: {
     flexDirection: 'row'
   },
   container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fbcf8d',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
 })
import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import EventComponent from '../components/EventComponent';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';

const Stack = createStackNavigator();

class ShowEventScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [
        {id: 1, name: 'Event1'},
        {id: 2, name: 'Event2'},
        {id: 3, name: 'Event3'},
        {id: 4, name: 'Event4'}
        ]
      };
    }
  
    render() {
      const { events } = this.state;
      return (
            <ScrollView>
                {events.map(event => (
                    <EventComponent key = {event.id} event = {event} />
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
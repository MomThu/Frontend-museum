import React from "react";
import { StyleSheet, FlatList, View, Text, ScrollView } from "react-native";
import SouvenirComponent from "../components/SouvenirComponent";

import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import HomeButton from '../components/homeButton';
import UserButton from '../components/userButton';
import TicketButton from '../components/ticketButton';
import AsyncStorage from "@react-native-community/async-storage";
const Stack = createStackNavigator();

class ShowSouvenirScreen extends React.Component {
    //Khoi tao
    constructor(props){
        super(props);
        this.state = {
            souvenirs: [
                
            ],
            image: [
              {url: require('../assets/souvenir/1.jpg')},
              {url: require('../assets/souvenir/2.jpg')},
              {url: require('../assets/souvenir/3.jpg')},
              {url: require('../assets/souvenir/4.jpg')},
              {url: require('../assets/souvenir/5.jpg')},
              {url: require('../assets/souvenir/6.jpg')},
            ]
        }
    }

    componentDidMount = () => {
        fetch('http://10.0.3.2:5000/souvenirs')
            .then((res) => {
                if(res.ok) {
                    return res;
                } else {
                    throw res;
                }
            })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ souvenirs: res['souvenirs']})
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

    handleClick = async (event, souvenir) => {
      console.log(souvenir);
      //AsyncStorage.setItem('souvenir', souvenir)
      var souvenirs = await AsyncStorage.getItem('souvenir');
      //console.log(souvenirs);
      if(souvenirs === null) {
        souvenirs = [];
      } else {
        souvenirs = JSON.parse(souvenirs);
      }
      souvenirs.push(souvenir);
      await AsyncStorage.setItem('souvenir', JSON.stringify(souvenirs));
      souvenirs = await AsyncStorage.getItem('souvenir');
      console.log(JSON.parse(souvenirs));
      //console.log(AsyncStorage.getItem('souvenir'))
    }

    render() {
        const souvenirs = this.state.souvenirs;
        return (
            // <FlatList
            //     data={this.state.products}
            //     renderItem={({ item }) =>
            //         <SouvenirComponent product={item} />
            //     }
            //     keyExtrator={(item) => '${item.id}'} />
            <ScrollView>
              {souvenirs.map((souvenir, index) => 
                  <SouvenirComponent key={souvenir.SouvenirId} souvenir={souvenir} image={this.state.image[index]} cart={(event) => this.handleClick(event, souvenir)}/>
              )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    HeaderStyle: {
        flexDirection: 'row'
    },
}) 

const showSouvenirScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="ShowSouvenirScreen"
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
          name="ShowSouvenirScreenChild"
          component={ShowSouvenirScreen}
          options={{
            title: 'Souvenir', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };
  
  export default showSouvenirScreenStack;
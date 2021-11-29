

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require('../assets/drawerWhite.png')}
          style={{width: 25, height: 25, marginRight: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader; 



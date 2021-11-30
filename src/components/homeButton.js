

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

const HomeButton = (props) => {

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => props.navigationProps.replace("DrawerNavigationRoutes")}>
        <Image
          source={require('../assets/icons/home.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HomeButton; 



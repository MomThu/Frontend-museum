

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

const TicketButton = (props) => {

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => props.navigationProps.replace("TicketScreen")}>
        <Image
          source={require('../assets/icons/tickets.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default TicketButton; 



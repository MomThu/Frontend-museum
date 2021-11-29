

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row', 
            flexWrap: 'wrap',
            backgroundColor: '#FBCF8DD9',
          }}>
          <Button title="Trái" />
          <Text>My museum</Text>
          <Button title="Phải" />

        </View>
        
        
      </View>
    </SafeAreaView>
  );
};

// const notificationScreenStack = ({navigation}) => {
//   return (
//     <Stack.Navigator
//       initialRouteName="NotificationScreen"
//       screenOptions={{
//         headerRight: () => (
//           <NavigationDrawerHeader navigationProps={navigation} />
//         ),
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: '#F9A606', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}>
//       <Stack.Screen
//         name="NotificationScreen"
//         component={NotificationScreen}
//         options={{
//           title: 'Notification', //Set Header Title
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
export default Header;
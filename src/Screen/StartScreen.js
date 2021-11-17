import React from "react";
import {Button, Input, StyleSheet, Text, View,  } from "react-native";
// import { Button, Input } from 'react-native-elements';
// import { Icon } from "react-native-elements";
// import Background from "../components/Background";

const StartScreen = (navigation) => {
    return (
        // <View>
        //     <Text>Hello Mom</Text>
        // </View>
        <View style={styles.container}>
            <Text>Start Screen!!!</Text>
            {/* <Input placeholder='INPUT WITH ICON' leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}/> */}

            <Button title="Register" onPress={() => navigation.navigate("Register")}></Button>
        </View>
        
    )
}

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: '50vw',
        color: '#fff'

    }
});
import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import DieuKhacImage from '../assets/anh1.jpg'

export default function EventComponent(props){
    const { event } = props;
    return (
        <TouchableOpacity activeOpacity= {0.5} onPress={()=>{Alert.alert('Click!')}}>
            <View style = {styles.container}>
                <Image style={styles.DieuKhacImage} source = {DieuKhacImage}/>
                <Text style={styles.title}>{event.name}</Text>
            </View>
        </TouchableOpacity>

    )
        
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#fbfbfb',
        marginBottom: 16,
    },
    DieuKhacImage:{
        width: 336,
        height: 148,
        borderRadius: 10
    },
    title: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700' 
    },
    
});
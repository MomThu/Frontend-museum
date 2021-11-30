import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import DieuKhacImage from '../assets/anh1.jpg'

export default function CategoryList(props){
    const { category } = props;
    return (
        <TouchableOpacity activeOpacity= {0.5} onPress={()=>{
            Alert.alert('Click!')
        }}>
            <View style = {styles.container}>
                <Image style={styles.DieuKhacImage} source = {DieuKhacImage}/>
                <Text style={styles.title}>{category.name}</Text>
            </View>
        </TouchableOpacity>

    )
        
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
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
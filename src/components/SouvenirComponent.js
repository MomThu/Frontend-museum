import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { black } from "react-native-paper/lib/typescript/styles/colors";

export default function SouvenirComponent(props) {
    //const { product, onAddToCartClick} = props;
    const product = props.souvenir;
    const onAddToCartClick = props.cart;
    return (
        <View style = {styles.shadow}>
            <View style = {styles.container}>
                
                <View style = {styles.info}>
                    <Text style = {styles.name}> {product.Name}</Text>
                    <View style = {styles.priceRow}>
                        <Text style={styles.price}>{/*formatPrice(product.price)*/ product.Price}$</Text>
                        <TouchableOpacity onPress={onAddToCartClick}>
                            <Text style= {styles.cartText}>MUA+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartText: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: '#2f95dc'
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width:10, height:0 }
    },
    container: {
        flexDirection: "row",
        marginBottom: 20,
        bordorRadius:4,
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    info: {
        width: '40%',
        padding:8,
        color: 'black'
    },
    img:{
        //alignSelf: "center",
        height: 150,
        width: '50%',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius:4
    },
    name: {
        fontSize: 16,
        marginBottom:8,
        color: "black"
    },
    price: {
        fontSize: 16,
        color: '#888',
        flex:1,
        color: 'black'
    }
}) 
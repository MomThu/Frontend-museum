import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function SouvenirComponent(props) {
    const { product, onAddToCartClick} = props;

    return (
        <View style = {styles.shadow}>
            <View style = {styles.container}>
                <Image style = {styles.img} source ={{ uri: product.images[0],url}} />
                <View style = {styles.info}>
                    <Text style = {styles.name}> {product.name}</Text>
                    <View style = {styles.priceRow}>
                        <Text style={styles.price}>{/*formatPrice(product.price)*/ product.price}</Text>
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
        marginBottom: 20,
        bordorRadius:4,
        backgroundColor: '#FFF',
        oerflow: 'hidden'
    },
    info: {
        padding:8
    },
    img:{
        height: 150,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius:4
    },
    name: {
        fontSize: 16,
        marginBottom:8
    },
    price: {
        fontSize: 16,
        color: '#888',
        flex:1
    }
})
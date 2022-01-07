import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'
import { baseUrl } from "../../config";
import AsyncStorage from "@react-native-community/async-storage"; 

export default OrderSouvenirComponent = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            fetch(baseUrl + 'souvenirorders/' + props.souvenir.OrderId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw res;
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setImageUrl({ uri: baseUrl + res['urlImage'] });
                })
                .catch(error => {
                    error.json()
                        .then(body => {
                            console.log(body);
                            alert(body.message);
                        })

                });
        });
    }, [])

    
    const souvenir = props.souvenir;

    return (
        
            <View style={styles.container}>
                
                <Text style={styles.textStyle}>Mã đơn hàng: {souvenir.OrderId}</Text>
                <Text style={styles.textStyle}>Ngày nhận: {souvenir.OrderDate}</Text>
                <Text style={styles.textStyle}>Ngày đặt: {souvenir.CreatedAt}</Text>
                <Text style={styles.textStyle}>Mã QR</Text>
                {imageUrl && <Image style={{ width: 100, height: 100 }} source={imageUrl} />}
            </View>

        

    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 10,
        backgroundColor: '#fbfbfb',
        marginBottom: 16,
    },
    DieuKhacImage: {
        width: 336,
        height: 148,
        borderRadius: 10
    },
    title: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700'
    },
    modalView: {
        backgroundColor: "#FFFCDC",
        marginVertical: '15%',
        marginHorizontal: '5%',
        height: '80%',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    button: {
        marginRight: 0,
        marginLeft: '95%',
        backgroundColor: 'gray',
        width: 30,
        height: 30,
        marginBottom: 5,
        paddingLeft: 10,
        paddingTop: 5
    },
    heart: {
        width: 20,
        height: 20,
        marginLeft: '90%',
        marginBottom: 10
    },
    textStyle: {
        color: "black"
    }
});
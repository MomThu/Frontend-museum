import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'
import { baseUrl } from "../../config";
import AsyncStorage from "@react-native-community/async-storage"; 
export default OrderTicketComponent = (props) => {
    const [imageUrl, setImageUrl] = useState("");
    
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            fetch(baseUrl + 'ticketorders/' + props.ticket.OrderId, {
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
                    console.log(imageUrl);
                })
                .catch(error => {
                    error.json()
                        .then(body => {
                            console.log(body.message);
                            alert(body.message);
                        })

                });
        });
    }, [])

    
    const ticket = props.ticket;

    const handleClick = () => {

    }
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            setModalVisible(true);
        }}>
            <View style={styles.container}>
                
                <Text style={styles.textStyle}>Mã vé: {ticket.OrderId}</Text>
                <Text style={styles.textStyle}>Ngày đi: {ticket.OrderDate}</Text>
                <Text style={styles.textStyle}>Ngày đặt: {ticket.CreatedAt}</Text>
                <Text style={styles.textStyle}>Thành tiền: {ticket.TotalPrice}VNĐ</Text>
                <Text style={styles.textStyle}>Mã QR</Text>
                <Image style={{ width: 100, height: 100 }} source={imageUrl} />
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
import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../../config";
import AsyncStorage from "@react-native-community/async-storage";

export default NotificationComponent = (props) => {
    const [ok, setOk] = useState(0);
    const [read, setRead] = useState(false);

    const notification = props.notification;

    const handleClick = async () => {
        const changeNoti = {
            id: notification.NotificationId,
            Unread: 1
        }
        if (read == true) {
            setRead(false);
            return;
        }
        setRead(true);
        await fetch(baseUrl + 'notification/' + changeNoti.id, {
            method: 'put',
            body: JSON.stringify(changeNoti),
            headers: {
                "Content-Type": "application/json",
            },
        })

        AsyncStorage.getItem('token').then((token) => {
            fetch(baseUrl + 'notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    props.setNotification(res['notifications']);
                })
                console.log(notification.Unread);

        })

    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleClick()}>
                    {!notification.Unread && <Text style={styles.title}>{notification.Title}</Text>}
                    {notification.Unread && <Text style={styles.titleRead}>{notification.Title}</Text>}
                </TouchableOpacity>
                {read &&
                    <Text>{notification.Content}</Text>}
            </View>
        </SafeAreaView>
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
        fontWeight: '700',
        backgroundColor: 'red'
    },
    titleRead: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700',
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
    }
});
import React, { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'

export default function EventComponent(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const event = props.event;
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
            <View style={styles.container}>
                <Image style={styles.DieuKhacImage} source={props.image.url} />

                <Text style={styles.title}>{event.Name}</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.textStyle}>Event: {event.Name}</Text>
                        <Text style={styles.textStyle}>Thời gian mở: {event.OpenTime}</Text>
                        <Text style={styles.textStyle}>Thời gian đóng: {event.CloseTime}</Text>
                        <Text style={styles.textStyle}>Ngày diễn ra: {event.EventDate}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>

                    </View>
                </ScrollView>
            </Modal>
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
        marginVertical: '50%',
        backgroundColor: "white",
        flexWrap: 'wrap',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
          color: 'black'
      }
});
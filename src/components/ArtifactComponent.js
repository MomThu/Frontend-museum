import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'
import { baseUrl } from "../../config";

export default ArtifactComponent = (props) => {
    const [imageUrl, setImageUrl] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch(baseUrl + 'image/' + props.artifact.ImageId)
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
        setImageUrl({uri: baseUrl + res.Path});
        console.log(imageUrl);
      })
      .catch(error => {
        error.json()
          .then(body => {
            alert(body.message);
          })

      });
    },[])

    const artifact = props.artifact;
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            setModalVisible(true);
        }}>
            <View style={styles.container}>
                <Image style={styles.DieuKhacImage} source={imageUrl} />
                <Text style={styles.title}>{artifact.Name}</Text>
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
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                        <Image style={styles.DieuKhacImage} source={imageUrl} />
                        <Text style={styles.textStyle}>{artifact.Description}</Text>
                    </View>
                </ScrollView>
            </Modal>
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
        fontWeight: '700',
        color: 'black'
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
        color: 'black'
    }
});
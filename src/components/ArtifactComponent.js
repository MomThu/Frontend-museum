import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native'
import DieuKhacImage from '../assets/anh1.jpg'

export default ArtifactComponent = (props) => {
    // const [imageUrl, setImageUrl] = useState('../assets/anh1.jpg');

    // useEffect(() => {
    //     fetch('http://10.0.3.2:5000/image/' + props.artifact.ImageId)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res;
    //     } else {
    //       throw res;
    //     }
    //   })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     //setImageUrl(res.Path + '/' + res.Url);
    //     console.log(res.Path + '/' + res.Url);
    //   })
    //   .catch(error => {
    //     error.json()
    //       .then(body => {
    //         console.log(body.message);
    //         alert(body.message);
    //       })

    //   });
    // },[])
    const [modalVisible, setModalVisible] = useState(false);

    const artifact = props.artifact;

    const handleClick = () => {
        
    }
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            setModalVisible(true);
        }}>
            <View style={styles.container}>
                {/* <Image style={styles.DieuKhacImage} source = {DieuKhacImage}/> */}

                <Image style={styles.DieuKhacImage} source={props.image.url} />
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
                        <Image style={styles.DieuKhacImage} source={props.image.url} />
                        <Text>{artifact.Description}</Text>
                        <TouchableOpacity >
                            <Image style={styles.heart} onPress={handleClick()} source={require('../assets/icons/heart.png')} />
                        </TouchableOpacity>
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
    }
});
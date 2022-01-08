import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView, } from 'react-native'
import { baseUrl } from "../../config";

export default function EventComponent(props) {
  const [imageUrl, setImageUrl] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(props.event.Poster);
    fetch(baseUrl + 'image/' + props.event.Poster)
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
        setImageUrl({ uri: baseUrl + res.Path });
        console.log(imageUrl);
      })
      .catch(error => {
        error.json()
          .then(body => {
            console.log(body.message);
            alert(body.message);
          })

      });
  }, [])

  const event = props.event;
  console.log(event);
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
      <View style={styles.container}>
        <Image style={styles.DieuKhacImage} source={imageUrl} />

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Image style={styles.DieuKhacImage} source={imageUrl} />
            <Text style={styles.textStyle}>Sự kiện: {event.Name}</Text>
            <Text style={styles.textStyle}>Thời gian mở: {event.OpenTime}</Text>
            <Text style={styles.textStyle}>Thời gian đóng: {event.CloseTime}</Text>
            <Text style={styles.textStyle}>Ngày diễn ra: {event.EventDate}</Text>
            
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
    backgroundColor: '#fff',
    margin: 26,
    width: 336
  },
  DieuKhacImage: {
    width: 336,
    height: 138,
    borderTopRightRadius: 10,
    borderTopLeftRadius:10,
  },
  title: {
    // textTransform: 'uppercase',
    marginBottom: 6,
    fontWeight: '700',
    color: 'black'
  },
  modalView: {
    //marginVertical: '50%',
    marginTop: 320,
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
    padding: 8,
    color: 'black',
    fontSize: 18
  },
  buttonClose:{
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
  }
});
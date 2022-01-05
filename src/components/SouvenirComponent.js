import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NumericInput from 'react-native-numeric-input';

import { baseUrl } from "../../config";

export default function SouvenirComponent(props) {
    const [imageUrl, setImageUrl] = useState({});

    const souvenir = props.souvenir;
    // const souvenirs = props.souvenirs;
    // const setSouvenirs = props.setSouvenirs;

    useEffect(() => {
        fetch(baseUrl + 'image/' + souvenir.ImageId)
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
            console.log(body.message);
            alert(body.message);
          })

      });
    },[])

    const onChange = (value) => {
        var souvenirs = props.souvenirs;
        for (let i = 0; i < souvenirs.length; i++) {
            if (souvenirs[i]['SouvenirId'] == souvenir['SouvenirId']) {
                souvenirs[i]['amount'] = value;
                break;
            } 
        }
        props.setSouvenirs(souvenirs);
    }

    return (
        <View style = {styles.shadow}>
            <View style = {styles.container}>
            <Image style={styles.img} source={imageUrl} />
                <View style = {styles.info}>
                    <Text style = {styles.name}> {souvenir.Name}</Text>
                    <View style = {styles.priceRow}>
                        <Text style={styles.price}>{/*formatPrice(product.price)*/ souvenir.Price}VNĐ</Text>
                        <NumericInput iconStyle={{ color: 'black' }} type='up-down' minValue={0} onChange={(value) => onChange(value)} />

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
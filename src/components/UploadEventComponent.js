import React, { useState } from 'react';
// Import core components
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { baseUrl } from '../../config.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
const UploadFileComponent = (props) => {
    const [singleFile, setSingleFile] = useState(null);
    

    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null && props.name !== null && props.description !== null && props.openTime != null && props.closeTime != null && props.openDate) {
            // If file selected then create FormData
            const fileToUpload = singleFile;
            console.log(fileToUpload);
            const data = new FormData();
            //data.append('name', JSON.stringify(fileToUpload[0].name));
            //data.append('pic', fileToUpload, JSON.stringify(fileToUpload[0].name));
            console.log(fileToUpload[0]);
            data.append('pic', fileToUpload[0]);
            console.log(data);
            // Please change file upload URL
            let res = await fetch(
                baseUrl + 'image',
                {
                    method: 'post',
                    body: data,
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(res);
            let responseJson = await res.json();
            alert(responseJson.msg);
            const dataToSend = {
                Name: props.name,
                Description: props.description,
                OpenTime: props.openTime,
                CloseTime: props.closeTime,
                EventDate: props.openDate,
                Poster: responseJson.ImageId,
            }
            console.log(dataToSend);
            await AsyncStorage.getItem('token').then(token => {
                fetch(baseUrl + 'event', {
                method: 'post',
                body: JSON.stringify(dataToSend),
                headers: {
                    //Header Defination
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            })
            .then(res => {
                if(res.ok) {
                    const notification = {
                        AccountId: 1,
                        Title: "B???o t??ng v???a th??m s??? ki???n m???i",
                        Content: props.name,
                        Time: new Date(),
                        Unread: 1,
                    }
                    AsyncStorage.getItem('token').then(token => {
                    fetch(baseUrl + 'notificationsAll', {
                        method: 'post',
                        body: JSON.stringify(notification),
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                          },
                    })
                })
                }
            })
        })
            setSingleFile(null);
            props.setModalVisible(false);
        
        } else {
            // If no file selected the show alert
            alert('Please fill data');
        }

    };

    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.images]
            });
            // Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            // Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        // <ScrollView>
        <View style={styles.mainBody}>
            {/*Showing the data of selected Single file*/}
            {singleFile != null ? (
                <Text style={styles.textStyle}>
                    File Name: {singleFile.name ? singleFile.name : ''}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadImage}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
        </View>
        
        // </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
        color: "black"
    },
});

export default UploadFileComponent;


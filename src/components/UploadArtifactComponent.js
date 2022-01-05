import React, { useState } from 'react';
// Import core components
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import { baseUrl } from '../../config.js';
import AsyncStorage from '@react-native-community/async-storage';

const UploadFileComponent = (props) => {
    const [singleFile, setSingleFile] = useState(null);

    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null && props.name !== null && props.description !== null) {
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
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            let responseJson = await res.json();
            alert(responseJson.msg);
            const dataToSend = {
                Name: props.name,
                Description: props.description,
                ImageId: responseJson.ImageId,
                Level: 1
            }
            await AsyncStorage.getItem('token').then(token => {
                fetch(baseUrl + 'artifact', {
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
                            Title: "Đã thêm hiện vật mới",
                            Content: props.name,
                            Time: new Date(),
                            Unread: 1,
                        }
                        fetch(baseUrl + 'notification', {
                            method: 'post',
                            body: JSON.stringify(notification),
                            headers: {
                                "Content-Type": "application/json",
                              },
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
                //type: [DocumentPicker.types.allFiles],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                type: [DocumentPicker.types.images]
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
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

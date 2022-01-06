// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Modal, Pressable, TextInput, ScrollView } from 'react-native';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

import UploadFileComponent from '../../components/UploadSouvenirComponent';

import { Searchbar, Checkbox, DataTable, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../../../config';

const Stack = createStackNavigator();

const SouvenirScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [optionsPerPage] = React.useState([2, 3, 4, 200]);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    const [souvenirs, setSouvenirs] = React.useState([]);
    const [deleted, setDeleted] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [nameSouvenir, setNameSouvenir] = React.useState(null);
    const [desSouvenir, setDesSouvenir] = React.useState(null);
    const [priceSouvenir, setPriceSouvenir] = React.useState(null);
    const [sortAscending, setSortAscending] = React.useState(true);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, souvenirs.length);

    React.useEffect(() => {
        AsyncStorage.getItem("token").then(token => {
            fetch(baseUrl + 'souvenirs', {
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
                .then(res => res.json())
                .then((res) => {
                    setSouvenirs(res['souvenirs']);
                    console.log(souvenirs);
                })
                .catch(error => {
                    error.json()
                        .then(body => {
                            alert(body.message);
                        })
                });
            })
        }, []);
    


    React.useEffect(() => {
        if (modalVisible === false) {
            setNameSouvenir(null);
            setDesSouvenir(null);
            setPriceSouvenir(null);
            AsyncStorage.getItem("token").then(token => {
                fetch(baseUrl + 'souvenirs', {
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
                    .then(res => res.json())
                    .then((res) => {
                        setSouvenirs(res['souvenirs']);
                        console.log(souvenirs);
                    })
                    .catch(error => {
                        error.json()
                            .then(body => {
                                alert(body.message);
                            })
                    });
            })

        }
    }, [modalVisible, deleted]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    const handleClickDelete = (souvenir) => {
        AsyncStorage.getItem("token").then(token => {
            fetch(baseUrl + 'souvenir/' + souvenir.SouvenirId, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        throw response;
                    }
                })
                .then(res => {
                    setDeleted(!deleted);
                    alert('Đã xóa');
                })
                .catch(error => {
                    error.json().then(body => {
                        alert(body.message);
                    })
                });
        })

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>

                <View>
                    <Text style={styles.textHeader}>Đồ Lưu Niệm</Text>
                </View>
                <Button icon="plus" mode='contained' style={{ width: 40, backgroundColor: '#F9A606', borderRadius: 10, marginBottom: 12, marginLeft: 18 }} onPress={() => setModalVisible(true)}>ADD</Button>
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
                            <TextInput
                                value={nameSouvenir}
                                onChangeText={setNameSouvenir}
                                style={styles.input}
                                placeholder='Name'
                            />
                            <TextInput
                                value={desSouvenir}
                                onChangeText={setDesSouvenir}
                                style={styles.inputArea}
                                placeholder='Description'
                                multiline={true}
                                numberOfLines={10}
                                placeholderTextColor='black'
                            />
                            <TextInput
                                value={priceSouvenir}
                                onChangeText={setPriceSouvenir}
                                style={styles.input}
                                placeholder='Price'
                                placeholderTextColor='black'
                                keyboardType='numeric'
                            />
                            <UploadFileComponent name={nameSouvenir} description={desSouvenir} price={priceSouvenir} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>

                        </View>
                    </ScrollView>
                </Modal>

                <ScrollView>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{ flex: 1, backgroundColor: 'black' }}>Id</DataTable.Title>
                            <DataTable.Title style={{ flex: 6, backgroundColor: 'black' }}>Name</DataTable.Title>
                            <DataTable.Title style={{ flex: 2, backgroundColor: 'black' }}>Xóa</DataTable.Title>
                        </DataTable.Header>
                        {souvenirs.slice(from, to).map(souvenir =>
                            <DataTable.Row key={souvenir.SouvenirId}>
                                <DataTable.Cell style={{ flex: 1, backgroundColor: 'black' }}>{souvenir.SouvenirId}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 6, backgroundColor: 'black' }}>{souvenir.Name}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2, backgroundColor: 'black' }}>
                                    <Button icon="delete" mode="contained" onPress={() => handleClickDelete(souvenir)} style={styles.deleteStyle}></Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(souvenirs.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${souvenirs.length}`}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={setItemsPerPage}
                            showFastPagination
                            selectPageDropdownLabel={'Rows per page'}
                            numberOfItemsPerPageList={optionsPerPage}
                        />
                    </DataTable>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const souvenirScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SouvenirScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#F9A606', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: 'center',

            }}>
            <Stack.Screen
                name="SouvenirScreen"
                component={SouvenirScreen}
                options={{
                    title: 'Souvenir', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};
export default souvenirScreenStack;

const styles = StyleSheet.create({
    textHeader:{
        color: 'black',
        marginBottom: 12,
        fontSize: 18
    },
    souvenir: {
        flexDirection: 'row',

    },
    text: {
        marginLeft: 20,
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
    input: {
        height: 40,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        color: 'black'
        //padding: 10,
    },
    inputArea: {
        height: 200,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        textAlignVertical: 'top',
        color: 'black'
        //padding: 10,
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
    deleteStyle: {
        backgroundColor: 'red',
        padding: 0
    },
    textStyle: {
        color: 'black'
    }
}) 


// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Modal, Pressable, TextInput, ScrollView } from 'react-native';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

import UploadFileComponent from '../../components/UploadArtifactComponent';

import { Searchbar, Checkbox, DataTable, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { baseUrl } from '../../../config';

const Stack = createStackNavigator();

const ArtifactScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [optionsPerPage] = React.useState([2, 3, 4, 200]);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    
    const [artifacts, setArtifacts] = React.useState([]);
    const [deleted, setDeleted] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [nameArtifact, setNameArtifact] = React.useState(null);
    const [desArtifact, setDesArtifact] = React.useState(null);
    const [sortAscending, setSortAscending] = React.useState(true);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, artifacts.length);

    React.useEffect(() => {
        fetch(baseUrl + 'artifacts')
            .then((res) => {
                if (res.ok) {
                    return res;
                } else {
                    throw res;
                }
            })
            .then(res => res.json())
            .then((res) => {
                setArtifacts(res['artifacts']);
                console.log(artifacts);
            })
            .catch(error => {
                error.json()
                    .then(body => {
                        alert(body.message);
                    })
            });
    }, []);

    React.useEffect(() => {
        if (modalVisible === false) {
            setNameArtifact(null);
            setDesArtifact(null);

            fetch(baseUrl + 'artifacts')
                .then((res) => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw res;
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    setArtifacts(res['artifacts']);
                    console.log(artifacts);
                })
                .catch(error => {
                    error.json()
                        .then(body => {
                            alert(body.message);
                        })
                });
        }
    }, [modalVisible, deleted]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const onChangeSearch = query => setSearchQuery(query);

    const handleClickDelete = (artifact) => {
        fetch(baseUrl + 'artifact/' + artifact.ArtifactId, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
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
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>

                <View style={{marginBottom: 14}}>
                    <Text>Artifact</Text>
                </View>
                <Button icon="plus" mode='contained' style={{ width: 40, backgroundColor: '#F9A606', borderRadius: 10, marginBottom: 12 }} onPress={() => setModalVisible(true)}>ADD</Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <TextInput
                            value={nameArtifact}
                            onChangeText={setNameArtifact}
                            style={styles.input}
                            placeholder='Name'
                        />
                        <TextInput
                            value={desArtifact}
                            onChangeText={setDesArtifact}
                            style={styles.inputArea}
                            placeholder='Description'
                            multiline={true}
                            numberOfLines={10}
                        />
                        <UploadFileComponent name={nameArtifact} description={desArtifact} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>

                    </View>
                </Modal>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 1 }}>Id</DataTable.Title>
                        <DataTable.Title style={{ flex: 6}}>Name</DataTable.Title>
                        <DataTable.Title style={{ flex: 2 }}>Xóa</DataTable.Title>
                    </DataTable.Header>
                    {artifacts.slice(from, to).map(artifact =>
                        <DataTable.Row key={artifact.ArtifactId}>
                            <DataTable.Cell style={{ flex: 1 }}>{artifact.ArtifactId}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 6 }}>{artifact.Name}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                                <Button icon="delete" mode="contained" onPress={() => handleClickDelete(artifact)} style={styles.deleteStyle}></Button>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(artifacts.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${artifacts.length}`}
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

const artifactScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="ArtifactScreen"
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
                name="ArtifactScreen"
                component={ArtifactScreen}
                options={{
                    title: 'Artifact', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};
export default artifactScreenStack;

const styles = StyleSheet.create({
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
        //padding: 10,
    },
    inputArea: {
        height: 200,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        textAlignVertical: 'top'
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
    }
})
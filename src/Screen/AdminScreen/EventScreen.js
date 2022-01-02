

// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Modal, Pressable, TextInput, ScrollView, Platform, TouchableOpacity, EditText } from 'react-native';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerHeader from './NavigationDrawerHeader';

import UploadFileComponent from '../../components/UploadEventComponent';
import UploadDateTime from '../../components/UploadDateTime';

import { Searchbar, Checkbox, DataTable, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { DateTimePicker } from '@react-native-community/datetimepicker'
import { baseUrl } from '../../../config';

const Stack = createStackNavigator();

const EventScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [optionsPerPage] = React.useState([2, 3, 4, 200]);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    
    const [events, setEvents] = React.useState([]);
    const [deleted, setDeleted] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [nameEvent, setNameEvent] = React.useState(null);
    const [desEvent, setDesEvent] = React.useState(null);
    const [openTimeEvent, setOTimeEvent] = React.useState(null);
    const [closeTimeEvent, setCTimeEvent] = React.useState(null);
    const [openDateEvent, setODateEvent] = React.useState(null);
    const [sortAscending, setSortAscending] = React.useState(true);
    

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, events.length);


    React.useEffect(() => {
        fetch(baseUrl + 'events')
            .then((res) => {
                if (res.ok) {
                    return res;
                } else {
                    throw res;
                }
            })
            .then(res => res.json())
            .then((res) => {
                setEvents(res['events']);
                console.log(events);
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
            setNameEvent(null);
            setDesEvent(null);

            fetch(baseUrl + 'events')
                .then((res) => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw res;
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    setEvents(res['events']);
                    console.log(events);
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

    const handleClickDelete = (event) => {
        fetch(baseUrl + 'event/' + event.EventId, {
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

                <View>
                    <Text>Event</Text>
                </View>
                <Button icon="plus" mode='contained' style={{ width: 40, backgroundColor: '#F9A606' }} onPress={() => setModalVisible(true)}>ADD</Button>
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
                            value={nameEvent}
                            onChangeText={setNameEvent}
                            style={styles.input}
                            placeholder='Name'
                        />
                        <TextInput
                            value={desEvent}
                            onChangeText={setDesEvent}
                            style={styles.inputArea}
                            placeholder='Description'
                            multiline={true}
                            numberOfLines={3}
                        />
                        <UploadDateTime />
                        <UploadFileComponent name={nameEvent} description={desEvent} openTime={openTimeEvent} closeTime={closeTimeEvent} openDate={openDateEvent} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                        {<Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>}

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
                    {events.slice(from, to).map(event =>
                        <DataTable.Row key={event.EventId}>
                            <DataTable.Cell style={{ flex: 1 }}>{event.EventId}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 6 }}>{event.Name}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                                <Button icon="delete" mode="contained" onPress={() => handleClickDelete(event)} style={styles.deleteStyle}></Button>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(events.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${events.length}`}
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

const eventScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="EventScreen"
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
                name="EventScreen"
                component={EventScreen}
                options={{
                    title: 'Event', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};
export default eventScreenStack;

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
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    deleteStyle: {
        backgroundColor: 'red',
        padding: 0
    }
})

/* import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const eventScreenStack = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default eventScreenStack; */
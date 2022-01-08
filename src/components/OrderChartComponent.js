import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Dimensions, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Checkbox, DataTable, Button } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import { baseUrl } from '../../config'

export default OrderChart = () => {
    const [souvenirs, setSouvenirs] = useState([]);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const dataToSend = {
            "order_date": currentDate
        }
        fetch(baseUrl + 'orderstats', {
            method: 'post',
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
              },
        })
            .then(res => {
                if(res.ok) return res;
                else throw res;
            })
            .then(res => res.json())
            .then(res => {
                const keys = Object.keys(res);
                var objs = [];
                keys.forEach(key => {
                    objs.push({name: key, amount: res[key]})
                });
                console.log(objs);
                setSouvenirs(objs);
            })
            .catch(error => {
                error.json()
                  .then(body => {
                    console.log(body.message);
                    alert(body.message);
                  })
        
              });
    };

    useEffect(() => {
        
        fetch(baseUrl + 'orderstats', {
            method: 'post',
            
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw response;
                }
            })
            .then(res => res.json())
            .then(res => {
                const keys = Object.keys(res);
                var objs = [];
                keys.forEach(key => {
                    objs.push({name: key, amount: res[key]})
                });
                console.log(objs);
                setSouvenirs(objs);
            })
            .catch(error => {
                error.json().then(body => {
                    console.log(body.message);
                })
            });

    }, [])

    const satisticAll = () => {
        setFilter(false);
        fetch(baseUrl + 'orderstats', {
            method: 'post',
            
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw response;
                }
            })
            .then(res => res.json())
            .then(res => {
                const keys = Object.keys(res);
                var objs = [];
                keys.forEach(key => {
                    objs.push({name: key, amount: res[key]})
                });
                console.log(objs);
                setSouvenirs(objs);
            })
            .catch(error => {
                error.json().then(body => {
                    console.log(body.message);
                })
            });
    }

    return (
        <SafeAreaView>
            {!filter && <View>
                <Text style={styles.labelStyle}>Thống kê đơn hàng</Text>
                <TouchableOpacity onPress={() => {
                    setFilter(true);
                    setShow(true);
                }} style={styles.cssButton}>
                    <Image source={require('../assets/icons/filter.png')} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 5 }} />
                    <Text style={styles.labelStyle}>Thống kê theo ngày</Text>
                </TouchableOpacity>
            </View>}
            {filter && <View>
                <TouchableOpacity onPress={() => satisticAll()} style={styles.cssButton}>
                    <Image source={require('../assets/icons/filter.png')} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 5 }} />
                    <Text style={styles.labelStyle}>Thống kê tất cả</Text>
                </TouchableOpacity>
            </View>}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <View>
                <Text style={styles.Total}>Đơn hàng đã đặt</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 6, backgroundColor: 'black'}}>Tên</DataTable.Title>
                        <DataTable.Title style={{ flex: 2, backgroundColor: 'black'}}>Số lượng</DataTable.Title>
                    </DataTable.Header>
                    {souvenirs.map(souvenir =>
                        <DataTable.Row key={souvenir.name}>
                            <DataTable.Cell style={{ flex: 6, backgroundColor: '#A3423C' }}>{souvenir.name}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2, backgroundColor: '#A3423C' }}>
                                {souvenir.amount}
                            </DataTable.Cell>
                        </DataTable.Row>
                    )}
                </DataTable>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    labelStyle: {
        color: 'black',
        marginBottom: 12
    },
    Total: {
        marginLeft: 25,
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    },
    cssButton: {
        backgroundColor: '#F9A606',
        height: 60,
        width: 150,
        alignItems: 'center',
        borderRadius: 10
    }
})
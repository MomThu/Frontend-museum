import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Dimensions, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker';

import { baseUrl } from '../../config'
//import { data, contributionData, pieChartData, progressChartData } from './data'
//import 'babel-polyfill'

// in Expo - swipe left to see the following styling, or create your own
export default TicketChart = () => {
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const [elderly, setElderly] = useState(0);
    const [total, setTotal] = useState(0);
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
        fetch(baseUrl + 'ticketstats', {
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
                setAdult(res["adult"]);
                setChildren(res["children"]);
                setElderly(res["elderly"]);
                setTotal(res["total"]);
            })
            .catch(error => {
                error.json()
                  .then(body => {
                    console.log(body.message);
                    alert(body.message);
                  })
        
              });
    };
    const pieChartData = [
        { name: 'Người lớn', amount: adult, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 13 },
        { name: 'Trẻ em', amount: children, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 13 },
        { name: 'Người già', amount: elderly, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 13 },

    ]
    useEffect(() => {
        
        fetch(baseUrl + 'ticketstats', {
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
                console.log(res["adult"]);
                setAdult(res["adult"]);
                setChildren(res["children"]);
                setElderly(res["elderly"]);
                setTotal(res["total"]);
            })
            .catch(error => {
                error.json().then(body => {
                    alert(body.message);
                })
            });

    }, [])

    const satisticAll = () => {
        setFilter(false);
        fetch(baseUrl + 'ticketstats', {
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
                console.log(res["adult"]);
                setAdult(res["adult"]);
                setChildren(res["children"]);
                setElderly(res["elderly"]);
                setTotal(res["total"]);
            })
            .catch(error => {
                error.json().then(body => {
                    alert(body.message);
                })
            });
    }
    return (
        <SafeAreaView>
            {!filter && <View>
                <Text style={styles.labelStyle}>Thống kê vé</Text>
                <Text style={styles.labelStyle}>Tổng thu nhập: {total} VNĐ</Text>
                <TouchableOpacity onPress={() => {
                    setFilter(true);
                    setShow(true);
                }} style={styles.cssButton}>
                    <Image source={require('../assets/icons/filter.png')} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 5 }} />
                    <Text style={styles.labelStyle}>Thống kê theo ngày</Text>
                </TouchableOpacity>
            </View>}
            {filter && <View>
                <Text style={styles.labelStyle}>Tổng thu nhập: {total} VNĐ</Text>
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
                <Text style={styles.labelStyle}>Biểu đồ vé theo độ tuổi</Text>
                <PieChart
                    data={pieChartData}
                    height={200}
                    width={350}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },

                    }}
                    accessor="amount"

                    style={{ marginVertical: 8, marginHorizontal: 30, paddingLeft: 20 }}
                />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    labelStyle: {
        color: 'black'
    },
    cssButton: {
        backgroundColor: '#F9A606',
        height: 60,
        width: 150,
        alignItems: 'center',
        borderRadius: 10
    }
})
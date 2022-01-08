import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';

const UploadDateTime = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode == 'time') {
      if(type == 'time1') {
        props.setOTimeEvent(currentDate);
      } else {
        props.setCTimeEvent(currentDate);
      }
    } else {
      setDate(currentDate);
      props.setODateEvent(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker1 = () => {
    showMode('time');
    setType('time1')
  };

  const showTimepicker2 = () => {
    showMode('time');
    setType('time2')
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <View style= {styles.TextStyle}>
        <Button onPress={showTimepicker1} title="Open Time" />
      </View>
      <View style= {styles.TextStyle}>
        <Button onPress={showTimepicker2} title="Close Time" />
      </View>
      <View style= {styles.TextStyle}>
        <Button onPress={showDatepicker} title="Open Date" />
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
export default UploadDateTime;

const styles = StyleSheet.create({
      TextStyle: {
        //marginBottom: 10,
        borderRadius: 12
      }
})
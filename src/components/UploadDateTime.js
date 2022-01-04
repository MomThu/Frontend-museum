import React, {useState} from 'react';
import {View, Button, Text, Platform, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const UploadDateTime = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.Android === 'android');
    setDate(currentDate);
    props.openTime = currentDate
    props.closeTime = currentDate
    props.openDate = currentDate
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
        <Button onPress={showTimepicker} title="Open Time"/>
      </View>
      <View>
        <Button onPress={showTimepicker} title="Close Time" />
      </View>
      <View>
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
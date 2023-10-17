import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

const InfoItem = ({ label, value, onChange, isPassword, multiLine }) => { // eslint-disable-line
  return (
    <View style={{
      marginTop: 5,
      marginBottom: 5,
      width: '100%',
    }}>
      <Text style={{
        color: '#66a8ff',
      }}>
        {label}
      </Text>
      <TextInput
        underlineColorAndroid='rgba(0,0,0,0)'
        value={value}
        onChangeText={onChange}
        secureTextEntry={!!isPassword}
        onFocus={isPassword ? () => onChange('') : null}
        multiline={multiLine}
        style={{
          fontSize: 18,
          color: '#333',
        }}
      />
    </View>
  );
};

export default InfoItem;
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}> 
    <Text 
        style={[styles(size).text, textStyle]} 
        onPress={props.onPress}>
            {props.title}
    </Text> 
</TouchableOpacity>
  );
};

  const styles = (size) =>
  StyleSheet.create({

    radius:{
      borderColor: '#fff',
      borderWidth: 2,
      height: size,
      width: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2,
    },
    text:{
      fontSize: size/3,
      color: '#fff',
    },


  });




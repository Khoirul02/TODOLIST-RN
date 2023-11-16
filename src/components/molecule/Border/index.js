/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
const Border = ({height, background}) => {
  return <View style={styles.bg(height,background)}/>;
};

export default Border;

const styles = StyleSheet.create({
  bg : (height, background) => ({
    borderWidth: height,
    marginBottom: 5,
    borderColor: background !== undefined ? background : '#E6E6E6',
    shadowColor: '#000',
    shadowOpacity: 4,
    elevation: 3,
  }),
});

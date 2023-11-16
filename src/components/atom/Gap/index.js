/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Gap = ({width, height, color}) => {
  return (
    <View
      style={styles.content(color, height, width)}
    />
  );
};

export default Gap;

const styles = StyleSheet.create({
  content: (color,height, width) => ({
    backgroundColor: color !== undefined ? color : null,
    height: height,
    width: width,
  }),
});

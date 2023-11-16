/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colorApp } from '../../../utils/GlobalVariable';
const IconOnly = ({ onPress, icon, iconSize }) => {
  const Icon = () => {
    return (
      <View
        style={styles.containerIcon}>
        <View
          style={styles.content}>
          <Feather
            name={icon}
            color={colorApp.black}
            size={iconSize === undefined ? 22 : iconSize}
          />
        </View>
      </View>
    );
  };
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
const styles = StyleSheet.create({
  containerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  content: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

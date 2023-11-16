/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colorApp } from '../../../utils/GlobalVariable';
import Entypo from 'react-native-vector-icons/Entypo';
const FloatingButton = ({ onPress }) => {
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={onPress} style={styles.containerButton}>
          <Entypo name="plus" size={20} color={colorApp.white} />
        </TouchableOpacity>
      </View>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    content : {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 30,
        alignItems: 'flex-end',
    },
    containerButton: {
        width: 50,
        height: 50,
        backgroundColor: colorApp.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colorApp.black,
        elevation: 5,
    },
});

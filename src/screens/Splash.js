/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { stylesheets } from '../assets';
import { colorApp } from '../utils/GlobalVariable';
import { SplashImage } from '../assets';
import { Gap } from '../components';
import {SimpleAnimation} from 'react-native-simple-animations';

const Splash = ({ navigation }) => {
    useEffect(() => {
      setTimeout(() => {
          navigation.replace('Home');
      }, 2500);
    }, []);
    return (
      <View style={stylesheets.contentCenter(colorApp.white)}>
          <SimpleAnimation delay={500} duration={1000} staticType="zoom" fade>
            <Image source={SplashImage} style={styles.image}/>
          </SimpleAnimation>
          <Gap height={15} />
          <Text style={stylesheets.titleBold(colorApp.black, 16)}> TodoList App </Text>
      </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    image: {
        width: 200,
        height : 200,
        resizeMode : 'contain',
  },
});

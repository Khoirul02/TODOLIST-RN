/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import Border from '../Border';
import { colorApp } from '../../../utils/GlobalVariable';
import { Gap } from '../../atom';
import IconOnly from '../IconOnly';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 66;
const Header = ({
  title,
  icon,
  iconEnd,
  color,
  background,
  border,
  iconSize,
  onPress,
  onPressEnd,
}) => {
  return (
    <>
      <SafeAreaView style={styles.wrapper(background)}>
        <View style={styles.content}>
          {icon !== undefined && (
            <View style={styles.postionBackPress}>
              <IconOnly icon={icon} iconSize={iconSize} onPress={onPress} />
            </View>
          )}
          <Text style={styles.title(color, icon)}>{title}</Text>
          {iconEnd !== undefined && (
            <View style={styles.postionPressEnd}>
              <IconOnly icon={iconEnd} iconSize={iconSize} onPress={onPressEnd} />
            </View>
          )}
        </View>
        <Gap color={background} height={10} />
        {border !== undefined && (
          <Border height={0.1} background={colorApp.black} />
        )}
      </SafeAreaView>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: background => ({
    backgroundColor: background === undefined ? colorApp.white : background,
    width: '100%',
  }),
  title: (color, icon) => ({
    fontSize: 20,
    marginLeft: icon === undefined ? 0 : 10,
    fontWeight: 'bold',
    color: color === undefined ? colorApp.black : color,
  }),
  content: {
    height: APPBAR_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postionBackPress: {position: 'absolute', left: 15, top: 15},
  postionPressEnd: {position: 'absolute',  top: 15, right: 15},
});

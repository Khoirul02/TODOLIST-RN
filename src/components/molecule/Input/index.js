/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorApp } from '../../../utils/GlobalVariable';
const Input = ({
  keyboardType,
  value,
  onChangeText,
  color,
  height,
  width,
  fontSize,
  placeholderText,
  iconEnd,
  onPress,
  editable,
  borderFull,
  borderRadius,
  onEndEditing,
  enterKeyHint,
  textAlignLabel,
  type,
  label,
  noBorder,
}) => {
  const [border, setBorder] = useState(colorApp.blackBlur);
  const onFocusForm = () => {
    setBorder(colorApp.primary);
  };

  const onBlurForm = () => {
    setBorder(colorApp.blackBlur);
  };
  const Label = () => {
    if (type === 'label') {
      return (
        <Text
          style={[
            styles.label,
            styles.addLabel(textAlignLabel, noBorder),
          ]}>
          {label}
        </Text>
      );
    }
    return <></>;
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress === undefined ? 1 : 0}
      style={styles.touch(onPress)}
      onPress={onPress}>
      <Label />
      <View
        style={
          borderFull === undefined
            ? styles.borderNotFull(border, noBorder, height)
            : styles.borderFull(border, borderRadius, height)
        }>
        <TextInput
          style={styles.input(color, height, width, fontSize, noBorder)}
          keyboardType={keyboardType !== undefined ? keyboardType : 'default'}
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          placeholder={placeholderText}
          placeholderTextColor={colorApp.blackBlur}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          enterKeyHint={enterKeyHint === undefined ? 'done' : enterKeyHint}
          editable={editable !== undefined ? editable : true}
        />
        {iconEnd !== undefined && (
          <>
            <View style={styles.containerIconEnd(height, width)}>
              {iconEnd === 'time-outline' ? (
                <Ionicons name={iconEnd} color={border} size={fontSize} />
              ) : (
                <SimpleLineIcons
                  name={iconEnd}
                  color={border}
                  size={fontSize}
                />
              )}
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (color, height, width, fontSize) => ({
    flex: 1,
    height: height !== undefined ? height : 50,
    fontSize: fontSize !== undefined ? fontSize : 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    color: color !== undefined ? color : colorApp.black,
  }),
  borderNotFull: (border, noBorder, height) => ({
    height: height === undefined ? 50 : height,
    borderBottomWidth: noBorder !== undefined ? 0 : 1,
    borderBottomColor: border,
  }),
  borderFull: (border, borderRadius, height) => ({
    height: height === undefined ? 50 : height,
    borderWidth: 1,
    borderRadius: borderRadius === undefined ? 10 : borderRadius,
    borderColor: border,
  }),
  label: {
    fontSize: 14,
    color: colorApp.black,
    justifyContent: 'flex-start',
  },
  addLabel: (textAlignLabel, noBorder) => ({
    textAlign: textAlignLabel !== undefined ? textAlignLabel : 'left',
    marginStart: noBorder === undefined ? 0 : 3,
    fontWeight: noBorder !== undefined ? 'bold' : '400',
  }),
  touch: onPress => ({zIndex: onPress === undefined ? 0 : 1}),
  containerIconEnd: (height, width) => ({
    position: 'absolute',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }),
});

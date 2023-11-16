/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { stylesheets } from '../../../assets';
import { colorApp } from '../../../utils/GlobalVariable';
const Button = ({
  width,
  height,
  borderRadius,
  backgroundColor,
  fontSize,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(height, borderRadius, backgroundColor, width)}>
      <Text style={stylesheets.titleBold(colorApp.white, fontSize)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: (height, borderRadius, backgroundColor, width) => ({
    height: height,
    borderRadius: borderRadius !== undefined ? borderRadius : 10,
    backgroundColor: backgroundColor,
    width: width,
    paddingHorizontal: width !== undefined ? 0 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

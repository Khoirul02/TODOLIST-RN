/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import { EmptyImage, stylesheets } from '../../../assets';
import {SimpleAnimation} from 'react-native-simple-animations';
import { colorApp } from '../../../utils/GlobalVariable';
import { Gap } from '../../atom';
const {width, height} = Dimensions.get('window');
const EmpetyPage = (title, description, customeHeight) => {
  const renderImage = () => {
    return (
      <Image
        source={EmptyImage}
        style={styles.image}
      />
    );
  };
  return (
    <SimpleAnimation
      style={styles.container(customeHeight)}
      delay={200}
      duration={500}
      staticType="zoom"
      bounce>
      {renderImage()}
      <Gap height={10} />
      <Text style={stylesheets.titleBold(colorApp.black, 16)}>{title}</Text>
      <Gap height={10} />
      {description !== undefined && (
        <Text
          style={styles.description}>
          {description}
        </Text>
      )}
    </SimpleAnimation>
  );
};
export default EmpetyPage;

const styles = StyleSheet.create({
  container: customeHeight => ({
    height: customeHeight === undefined ? height / 1.15 : customeHeight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
  }),
  image: {width: width / 2, resizeMode: 'contain', height: 200},
  description: {
    color: colorApp.black,
    fontSize: 14,
    textAlign: 'center',
  },
});

/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colorApp } from '../../../utils/GlobalVariable';
import { stylesheets } from '../../../assets';
import Moment from 'moment';
const ListItem = ({ data, onPress }) => {
  let date = Moment(data.date.toDate()).format('DD MMMM YYYY');
  let time = Moment(data.date.toDate()).format('HH:mm');
  let timeEnd = Moment(data.dateEnd.toDate()).format('HH:mm');
  let dateTime = `${date} (${time} - ${timeEnd})`;
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerList}>
        <View style={styles.row}>
          <View>
            <Text style={stylesheets.titleBold(colorApp.black, 16)}>
              {data.title}
            </Text>
            <Text style={stylesheets.title(colorApp.black, 14)}>
              {data.description}
            </Text>
            <Text style={stylesheets.title(colorApp.black, 14)}>
              {dateTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
};
export default ListItem;

const styles = StyleSheet.create({
    containerList : {
        marginTop: 10,
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: colorApp.white,
        shadowColor: colorApp.black,
        elevation: 3,
        padding: 15,
    },
    row : {flexDirection: 'row'},
});

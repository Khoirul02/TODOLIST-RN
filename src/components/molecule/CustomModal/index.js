/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorApp } from '../../../utils/GlobalVariable';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import { stylesheets } from '../../../assets';
import Button from '../Button';
import { Gap } from '../../atom';
const { width } = Dimensions.get('window');
const CustomModal = ({
  status,
  type,
  action,
  data,
  onUpdateDate,
  onUpdateTime,
  onUpdateTimeEnd,
  title,
  statusShowDate,
  date,
  time,
  timeEnd,
  actionConfrim,
}) => {
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    const dataDate = {
      data: currentDate,
      status: false,
      action: action,
    };
    onUpdateDate(dataDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentTime = selectedDate;
    const dataTime = {
      data: currentTime,
      status: false,
      action: action,
    };
    onUpdateTime(dataTime);
  };
  const onChangeTimeEnd = (event, selectedDate) => {
    const currentTime = selectedDate;
    const dataTime = {
      data: currentTime,
      status: false,
      action: action,
    };
    onUpdateTimeEnd(dataTime);
  };
  if (type === 'date') {
    return (
      <Modal animationType="none" transparent={true} visible={status}>
        <View style={stylesheets.containerFlex}>
          <View style={styles.containerDate}>
            {statusShowDate && (
              <DateTimePicker
                themeVariant="light"
                testID="dateTimePicker"
                value={ date === '' ? new Date() : date}
                mode={'date'}
                is24Hour={true}
                display={'default'}
                onChange={onChangeDate}
                textColor={colorApp.black}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
  if (type === 'time') {
    return (
      <Modal animationType="none" transparent={true} visible={status}>
        <View style={stylesheets.containerFlex}>
          <View style={styles.containerDate}>
            {statusShowDate && (
              <DateTimePicker
                themeVariant="light"
                testID="dateTimePicker"
                value={time === '' ? new Date() : time}
                mode={'time'}
                is24Hour={true}
                display={'default'}
                onChange={onChangeTime}
                textColor={colorApp.black}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
  if (type === 'timeEnd') {
    return (
      <Modal animationType="none" transparent={true} visible={status}>
        <View style={stylesheets.containerFlex}>
          <View style={styles.containerDate}>
            {statusShowDate && (
              <DateTimePicker
                themeVariant="light"
                testID="dateTimePicker"
                value={timeEnd === '' ? new Date() : timeEnd}
                mode={'time'}
                is24Hour={true}
                display={'default'}
                onChange={onChangeTimeEnd}
                textColor={colorApp.black}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
  if (type === 'confrim') {
    return (
      <Modal animationType="slide" transparent={true} visible={status}>
        <View style={styles.containerModal}>
          <View style={styles.containerConfrim}>
            <View style={styles.contentConfrim}>
              <Text style={stylesheets.titleCenter(colorApp.black, 25)}>{title}</Text>
              <Gap height={10} />
              <Text
                style={stylesheets.titleCenter(colorApp.black, 16)}>
                {data}
              </Text>
              <Gap height={20} />
              <View style={stylesheets.row}>
                <Button
                  onPress={() => actionConfrim(true, action)}
                  height={50}
                  width={width / 2.4}
                  backgroundColor={colorApp.primary}
                  borderRadius={10}
                  fontSize={16}
                  title={'Yes'}
                />
                <Gap width={10} />
                <Button
                  onPress={() => actionConfrim(false, action)}
                  height={50}
                  width={width / 2.4}
                  backgroundColor={'red'}
                  borderRadius={10}
                  fontSize={16}
                  title={'No'}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <Modal animationType="none" transparent={true} visible={status}>
      <View style={styles.containerModal}>
        <View style={stylesheets.contentCenterNoBackground}>
          <ActivityIndicator size={'large'} color={colorApp.primary} />
          <Text style={stylesheets.title(colorApp.white, 14)}>{title}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;

const styles = StyleSheet.create({
  containerDate: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {flex: 1, backgroundColor: colorApp.modal.background},
  containerConfrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentConfrim: {
    backgroundColor: colorApp.white,
    padding: 31,
    alignItems: 'center',
    width: '100%',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    justifyContent: 'center',
  },
});

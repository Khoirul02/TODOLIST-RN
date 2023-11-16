/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {stylesheets} from '../assets';
import {colorApp, textApp} from '../utils/GlobalVariable';
import {Button, CustomModal, Gap, Header, Input} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {
  setDate,
  setDescription,
  setLoading,
  setLocation,
  setModal,
  setTime,
  setTitle,
  setTypeModal,
  setTimeEnd,
  sendTodoToCalendar,
} from '../redux/todo/todoSlice';
import {FlashMessageManager} from '../utils/FlashMessageManager';
import PermissionManager from '../utils/PermissionManager';
import { NotificationManager } from '../services/notification';
const {width} = Dimensions.get('window');
const Detail = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const {
    title,
    description,
    date,
    location,
    time,
    timeEnd,
    isLoading,
    modal,
    typeModal,
  } = useSelector(state => state.todo);
  useEffect(() => {
    console.log(data);
    peparationData();
  }, []);
  const peparationData = () => {
    dispatch(setTitle(data.title));
    dispatch(setDescription(data.description));
    dispatch(setLocation(data.location));
    let convertionDate = new Date(data.date.toDate());
    dispatch(setDate(convertionDate));
    let convertionTime = new Date(data.date.toDate());
    dispatch(setTime(convertionTime));
    let convertionTimeEnd = new Date(data.dateEnd.toDate());
    dispatch(setTimeEnd(convertionTimeEnd));
  };
    const permissionAccessCalendar = async () => {
        let access = await PermissionManager.PermissionCalendar();
        console.log(access);
        if (access) {
            sendDataToCalendar();
        } else {
            FlashMessageManager.errorMessage('Access Calndar Permission Denied!');
        }
    };
  const sendDataToCalendar = async () => {
      const dateString = Moment(date).format('YYYY-MM-DD');
      const timeString = Moment(time).format('HH:mm');
      const timeEndString = Moment(timeEnd).format('HH:mm');
      let params = {
        title: title,
        description: description,
        location: location,
        date: new Date(`${dateString}T${timeString}`),
        dateEnd: new Date(`${dateString}T${timeEndString}`),
      };
      dispatch(setLoading(true));
      try {
        dispatch(sendTodoToCalendar(params)).then(res => {
          console.log(res.meta.requestStatus);
          if (res.meta.requestStatus === 'fulfilled') {
              FlashMessageManager.successMessage(res.payload.message);
              NotificationManager.scheduleNotificationLocal(params);
          } else {
              FlashMessageManager.errorMessage('Failed Update Data');
          }
        });
      } catch (err) {
        console.log(err);
      }
  };
  const openModalAction = (type, vtitle, vdata, action) => {
    const dataModalTemp = {
      type: type,
      title: vtitle,
      data: vdata,
      action: action,
    };
    dispatch(setTypeModal(dataModalTemp));
    setTimeout(() => {
      dispatch(setModal(true));
    }, 100);
    };
   const moveFormulir = () => {
      navigation.navigate('Formulir', {data: data});
    };
  return (
    <View style={stylesheets.container(colorApp.white)}>
      <Header
        icon={'arrow-left'}
        onPress={() => navigation.goBack()}
        background={colorApp.white}
        title={'Detail Data'}
        border={true}
        iconEnd={'calendar'}
        onPressEnd={() =>
          openModalAction(
            'confrim',
            'Warning',
            'Are you sure you want to send data to the calendar?',
            data,
          )
        }
      />
      <View style={stylesheets.pages}>
        <Input
          color={colorApp.black}
          height={40}
          width={width}
          fontSize={16}
          type={'label'}
          label={'Title'}
          value={title}
          noBorder={true}
          editable={false}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={40}
          width={width}
          fontSize={16}
          type={'label'}
          label={'Description'}
          value={description}
          noBorder={true}
          editable={false}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={40}
          width={width}
          fontSize={16}
          type={'label'}
          label={'Location'}
          value={location}
          noBorder={true}
          editable={false}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={40}
          fontSize={16}
          type={'label'}
          label={'Date'}
          width={width / 1.12}
          placeholderText={'Date'}
          value={Moment(date).format('DD MMMM YYYY')}
          editable={false}
          noBorder={true}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={50}
          fontSize={16}
          type={'label'}
          label={'Time'}
          width={width / 1.12}
          value={`${Moment(time).format('HH:mm')} - ${Moment(timeEnd).format('HH:mm')}`}
          editable={false}
          noBorder={true}
        />
        <View style={stylesheets.contentFloatingBottom}>
          <Button
            onPress={() => moveFormulir()}
            height={50}
            width={width / 1.09}
            backgroundColor={colorApp.primary}
            borderRadius={10}
            fontSize={16}
            title={'Update Data'}
          />
        </View>
      </View>
      <CustomModal status={isLoading} title={textApp.loading} />
      <CustomModal
        status={modal}
        type={typeModal.type}
        title={typeModal.title}
        data={typeModal.data}
        action={typeModal.action}
        actionConfrim={(status, vdata) => {
          console.log(vdata);
          if (status) {
            dispatch(setModal(false));
            permissionAccessCalendar();
          } else {
            dispatch(setModal(false));
          }
        }}
      />
    </View>
  );
};

export default Detail;

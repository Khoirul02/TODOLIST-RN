/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {stylesheets} from '../assets';
import {colorApp, textApp} from '../utils/GlobalVariable';
import {
    Button,
    CustomModal,
    Gap,
    Header,
    Input,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import { createTodo, setDate, setDescription, setLoading, setLocation, setModal, setShowDate, setTime, setTitle, setTypeModal, clearStateAfterAction, updateTodo, setTimeEnd } from '../redux/todo/todoSlice';
import { FlashMessageManager } from '../utils/FlashMessageManager';
const { width } = Dimensions.get('window');
const Formulir = ({ navigation, route }) => {
  const { data } = route.params;
  const dispatch = useDispatch();
  const {
    isLoading,
    title,
    description,
    date,
    modal,
    typeModal,
    showDate,
    location,
    time,
    timeEnd,
  } = useSelector(state => state.todo);
  useEffect(() => {
    console.log(data);
    peparationData();
  }, []);
  const peparationData = () => {
    if (data !== '') {
      dispatch(setTitle(data.title));
      dispatch(setDescription(data.description));
      dispatch(setLocation(data.location));
      let convertionDate = new Date(data.date.toDate());
      dispatch(setDate(convertionDate));
      let convertionTime = new Date(data.date.toDate());
      dispatch(setTime(convertionTime));
      let convertionTimeEnd = new Date(data.dateEnd.toDate());
      dispatch(setTimeEnd(convertionTimeEnd));
    } else {
      dispatch(clearStateAfterAction());
    }
  };
  const onChangeTitle = value => {
      dispatch(setTitle(value));
  };
  const onChangeDescription = value => {
      dispatch(setDescription(value));
  };
  const onChangeLocation = value => {
    dispatch(setLocation(value));
  };
  const openModalAction = (type, vtitle, vdata, action) => {
      const dataModalTemp = {
          type: type,
          title: vtitle,
          data: vdata,
          action: action,
      };
      if (type !== 'confrim') {
        setTimeout(() => {
          dispatch(setShowDate(true));
        }, 600);
      }
      dispatch(setTypeModal(dataModalTemp));
      setTimeout(() => {
        dispatch(setModal(true));
      }, 500);
  };
  const saveActionAndUpdate = async () => {
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
    if (data === '') {
      save(params);
    } else {
      update(params);
    }
  };
  const save = async (params) => {
    console.log(params);
    dispatch(setLoading(true));
    try {
      dispatch(createTodo(params)).then(res => {
        console.log('RESPONSE ADD', res);
        if (res.meta.requestStatus === 'fulfilled') {
          FlashMessageManager.successMessage(res.payload.message);
        } else {
          FlashMessageManager.errorMessage('Failed Add Data');
        }
        dispatch(clearStateAfterAction());
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const update = async (paramsUpdate) => {
    console.log('Id Data', data.id);
    console.log('Test Data', paramsUpdate);
    paramsUpdate.id = data.id;
    dispatch(setLoading(true));
    try {
      dispatch(updateTodo(paramsUpdate)).then(res => {
        console.log(res.meta.requestStatus);
        if (res.meta.requestStatus === 'fulfilled') {
          FlashMessageManager.successMessage(res.payload.message);
        } else {
          FlashMessageManager.errorMessage('Failed Update Data');
        }
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const sendDataToCalendar = async () => {

  };
  return (
    <View style={stylesheets.container(colorApp.white)}>
      <Header
        icon={'arrow-left'}
        onPress={() => navigation.goBack()}
        background={colorApp.white}
        title={data !== '' ? 'Edit Data' : 'Formulir'}
        border={true}
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
          onChangeText={e => onChangeTitle(e)}
          placeholderText={'Input Title'}
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
          onChangeText={e => onChangeDescription(e)}
          placeholderText={'Input Description'}
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
          onChangeText={e => onChangeLocation(e)}
          placeholderText={'Input Description'}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={50}
          fontSize={16}
          type={'label'}
          label={'Date'}
          width={width / 1.12}
          placeholderText={'Input Date'}
          value={date !== '' ? Moment(date).format('DD MMMM YYYY') : ''}
          iconEnd={'calendar'}
          editable={false}
          onPress={() => openModalAction('date', '', '', 'date')}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={50}
          fontSize={16}
          type={'label'}
          label={'Time'}
          width={width / 1.12}
          placeholderText={'Input Time'}
          value={time !== '' ? Moment(time).format('HH:mm') : ''}
          iconEnd={'time-outline'}
          editable={false}
          onPress={() => openModalAction('time', '', '', 'time')}
        />
        <Gap height={10} />
        <Input
          color={colorApp.black}
          height={50}
          fontSize={16}
          type={'label'}
          label={'Time End'}
          width={width / 1.12}
          placeholderText={'Input Time End'}
          value={timeEnd !== '' ? Moment(timeEnd).format('HH:mm') : ''}
          iconEnd={'time-outline'}
          editable={false}
          onPress={() => openModalAction('timeEnd', '', '', 'time')}
        />
        <Gap height={20} />
        <Button
          onPress={() => saveActionAndUpdate()}
          height={50}
          width={width / 1.09}
          backgroundColor={colorApp.primary}
          borderRadius={10}
          fontSize={16}
          title={data !== '' ? 'Update' : 'Save'}
        />
      </View>
      <CustomModal
        status={modal}
        type={typeModal.type}
        title={typeModal.title}
        data={typeModal.data}
        action={typeModal.action}
        statusShowDate={showDate}
        date={date}
        time={time}
        timeEnd={timeEnd}
        onUpdateDate={item => {
          dispatch(setShowDate(item.status));
          dispatch(setDate(item.data));
          dispatch(setModal(item.status));
        }}
        onUpdateTime={item => {
          dispatch(setShowDate(item.status));
          dispatch(setTime(item.data));
          dispatch(setModal(item.status));
        }}
        onUpdateTimeEnd={item => {
          dispatch(setShowDate(item.status));
          dispatch(setTimeEnd(item.data));
          dispatch(setModal(item.status));
        }}
        actionConfrim={(status, vdata) => {
          console.log(vdata);
          if (status) {
            dispatch(setModal(false));
            sendDataToCalendar();
          } else {
            dispatch(setModal(false));
          }
        }}
      />
      <CustomModal status={isLoading} title={textApp.loading} />
    </View>
  );
};

export default Formulir;

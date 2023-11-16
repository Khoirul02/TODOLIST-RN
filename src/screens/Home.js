/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesheets } from '../assets';
import { colorApp, textApp } from '../utils/GlobalVariable';
import { CustomModal, EmpetyPage, FloatingButton, Header, ListItem } from '../components';
import {useDispatch, useSelector} from 'react-redux';
import { deleteTodo, getTodo, setLoading, setModal, setTypeModal } from '../redux/todo/todoSlice';
import Feather from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlashMessageManager } from '../utils/FlashMessageManager';
const { width, height } = Dimensions.get('window');
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const {listTodo, isLoading, message, modal, typeModal} = useSelector(state => state.todo);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getTodo());
    });
    return unsubscribe;
  }, [dispatch]);
  const deleteItem = async params => {
    console.log(params);
    dispatch(setLoading(true));
    try {
      dispatch(deleteTodo(params)).then(res => {
        console.log(res);
        if (res.meta.requestStatus === 'fulfilled') {
          FlashMessageManager.successMessage(res.payload.message);
        } else {
          FlashMessageManager.errorMessage('Failed Delete Data');
        }
        dispatch(getTodo());
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
      }, 500);
  };

  const renderListTodoList = item => {
    return (
      <Swipeable renderRightActions={() => rightSwipeActions(item.id)}>
        <ListItem onPress={() => moveDetail(item)} data={item} />
      </Swipeable>
    );
  };
  const rightSwipeActions = id => {
    return (
      <View style={styles.containerSwipe}>
        <TouchableOpacity
          onPress={() =>
            openModalAction(
              'confrim',
              'Warning',
              'Are you sure you want to delete this data?',
              id,
            )
          }>
          <Feather name="trash-2" size={32} color={colorApp.white} />
        </TouchableOpacity>
      </View>
    );
  };
  const Separator = () => <View style={styles.itemSeparator} />;
  const moveDetail = data => {
    navigation.navigate('Detail', {data: data});
  };
  return (
    <GestureHandlerRootView style={stylesheets.container(colorApp.white)}>
      <Header
        //icon={'arrow-left'}
        background={colorApp.white}
        title={'Beranda'}
        border={true}
      />
      <View style={stylesheets.pages}>
        {!isLoading && listTodo.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listTodo}
            renderItem={({item}) => renderListTodoList(item)}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => Separator()}
          />
        ) : (
          EmpetyPage(textApp.header, message, height / 1.2)
        )}
      </View>
      <FloatingButton
        onPress={() => navigation.navigate('Formulir', {data: ''})}
      />
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
            deleteItem(vdata);
          } else {
            dispatch(setModal(false));
          }
        }}
      />
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 1,
  },
  containerSwipe: {
    backgroundColor: colorApp.blackBlur,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: width / 5,
  },
});

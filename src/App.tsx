/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { Platform, StatusBar, StyleSheet, View, LogBox } from 'react-native';
import firebase from '@react-native-firebase/app';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import FlashMessage from 'react-native-flash-message';
import { NotificationManager } from './services/notification';
import { firebaseConfig } from './utils/GlobalVariable';
import RouteManager from './utils/RootManager';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const App = () => {
  useEffect(() => {
    NotificationManager.notificationConfigure();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    }
    NotificationManager.firebaseBackgroundMessageHandler();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    if (Platform.OS === 'ios') {
      NotificationManager.channelExistCheck();
      PushNotificationIOS.addEventListener(
        'notification',
        NotificationManager.handleRemoteMessage,
      );
      var handler = NotificationManager.notificationHandler();
      return () => {
        PushNotificationIOS.removeEventListener('notification');
        handler;
      };
    } else {
      NotificationManager.channelExistCheck();
      NotificationManager.notificationHandler();
    }
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <Provider store={store}>
      <View style={style.container}>
        <View style={style.containerChild}>
          <RouteManager />
          <FlashMessage position="bottom" />
        </View>
      </View>
    </Provider>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        paddingTop: StatusBar.currentHeight,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  containerChild: {
    flexGrow: 1,
  },
});

export default App;

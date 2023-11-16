/* eslint-disable prettier/prettier */
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { firebaseConfig, textApp } from '../utils/GlobalVariable';
import { Platform } from 'react-native';
import { CutString } from '../utils/CutString';

const NotificationManager = {
  createChannel: () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    PushNotification.createChannel(
      {
        channelId: textApp.channel,
        channelName: 'Todo App Channel Notification',
        channelDescription: 'A channel to categorize your notifications',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      res => {
        console.log('====================================');
        console.log(`created ${res}`);
        console.log('====================================');
      },
    );
  },
  channelExistCheck: () => {
    PushNotification.channelExists(textApp.channel, function (exists) {
      if (exists) {
        console.log('Channel Exist? :', exists);
      } else {
        NotificationManager.createChannel();
      } // true/false
    });
  },
  getDevicesToken: async () => {
    var apns = await messaging().getToken();
    return apns;
  },
  localNotificationInitAndroid: notification => {
    let title = notification.title;
    let message = notification.body;
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: textApp.channel,
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigLargeIcon: 'ic_launcher',
      bigText: message, // (optional) default: "message" prop
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      subtitle: message, // (optional) smaller title below notification title
      playSound: true,
      importance: Importance.HIGH,
      allowWhileIdle: true,
      priority: 'high',
      visibility: 'public',
      soundName: 'default',
      /* iOS and Android properties */
      title: title, // (optional)
      message: message, // (required)
    });
  },
  localNotificationInitIOS: notification => {
    let title = notification.title;
    let message = notification.body;
    PushNotificationIOS.addNotificationRequest({
      id: textApp.channel,
      title: title,
      subtitle: title,
      body: message,
      sound: 'default',
      badge: 1,
    });
  },
  notificationConfigure: () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        let tokenApns = NotificationManager.getDevicesToken();
        tokenApns
          .then(value => {
            if (Platform.OS === 'ios') {
              console.log(`TOKEN IOS: ${value}`);
            } else {
              console.log(`TOKEN Android: ${value}`);
            }
          })
          .catch(err => {
            console.log('====================================');
            console.log(`${err}`);
            console.log('====================================');
          });
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        if (Platform.OS === 'ios') {
          NotificationManager.localNotificationInitIOS(notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
          NotificationManager.handleRemoteMessage(notification);
        } else {
          NotificationManager.localNotificationInitAndroid(notification);
          NotificationManager.handleRemoteMessage(notification);
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      senderID: '566062375225',
      popInitialNotification: true,
      requestPermissions: true,
    });
  },

  notificationHandler: () => {
    messaging().onMessage(async remoteMessage => {
      if (Platform.OS === 'ios') {
        NotificationManager.localNotificationInitIOS(remoteMessage);
      } else {
        NotificationManager.localNotificationInitAndroid(remoteMessage);
      }
    });
  },

  firebaseBackgroundMessageHandler: async () => {
    await messaging()
      .subscribeToTopic(textApp.subscribeTopic)
      .then(() => console.log('Subscribed to topic!'));
    if (Platform.OS === 'android') {
      await messaging().registerDeviceForRemoteMessages();
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (Platform.OS === 'ios') {
        NotificationManager.localNotificationInitIOS(remoteMessage);
      }
      NotificationManager.localNotificationInitAndroid(remoteMessage);
    });
  },
  handleRemoteMessage: notification => {
    if (notification.data) {
      if (notification.userInteraction === true) {
        console.log('Click Action');
      }
    } else {
      if (notification.foreground === false) {
        console.log('Not Click Action');
      } else {
        console.log('Click Action');
      }
    }
    if (Platform.OS === 'ios') {
      const result = PushNotificationIOS.FetchResult.NoData;
      notification.finish(result);
    }
  },
  scheduleNotificationLocal: (data) => {
    let vTitle = `${data.title} segera dimuali`;
    let description =
      data.description.length > 10
        ? CutString(data.description, 10)
        : data.description;
    const channelId = textApp.channel; // Replace with your channel ID (for Android)
    console.log(data.date);
    const date = new Date(data.date - 1000 * 60 * 5);
     PushNotification.localNotificationSchedule({
       channelId : channelId,
       title: vTitle,
       message: description,
       date : date,
     });
  },
};

export {NotificationManager};

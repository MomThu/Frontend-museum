//import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, {Importance} from "react-native-push-notification";

// // Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     //notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: Platform.OS === 'ios',
// });


// export.module = CreateChannelNotification = () => {
//   PushNotification.createChannel(
//     {
//       channelId: "channel-idm", // (required)
//       channelName: "My channel", // (required)
//       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//       playSound: false, // (optional) default: true
//       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//       importance: 1, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//   );


export const LocalNotification = () => {
    PushNotification.localNotification({
      channelId: "channel-test",
      autoCancel: true,
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      bigText:
        'Tham quan bảo tàng online.',
      subText: 'Thanh toán và đặt vé thành công',
      title: 'Thanh toán thành công vé ',
      message: 'Kéo để xem thêm',
      vibrate: true,
      vibration: 500,
      playSound: true,
      soundName: 'default',
      ignoreInForeground: false,
      // actions: '["Yes", "No"]',
    });
  };


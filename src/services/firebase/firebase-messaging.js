import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase-config";

const messaging = getMessaging(firebaseApp);

// Saving the messaging device token to Cloud Firestore.
const savaMessagingDeviceToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      console.log("Got FCM  device token.");
      // get ref
      // set doc

      onMessage(messaging, (message) => {
        // notification payload
        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } else {
      await requestNotificationPermissions();
    }
  } catch (error) {
    throw error;
  }
};

const requestNotificationPermissions = async () => {
  console.log("Requesting notifications permission...");
  const permission = await Notification.requestPermission();
  if (permission) {
    console.log("Notification permission granted.");
    await savaMessagingDeviceToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
};

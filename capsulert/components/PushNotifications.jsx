import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  LogBox,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { getDatabase, set, ref, push } from "firebase/database";
import { UserContext } from "../contexts/User";
import { NotificationsContext } from "../contexts/Notifications";

LogBox.ignoreLogs([
  "Calling getExpoPushTokenAsync without specifying a projectId is deprecated and will no longer be supported in SDK 49+",
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const pathwayURL = Constants.manifest.hostUri.split(":")[0];

const PushNotifications = ({
  notificationsModalOpen,
  setNotificationsModalOpen,
  modalOpen,
  setModalOpen,
  time,
  setTime,
}) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [dateModal, setDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeModal, setTimeModal] = useState(false);

  const { userId } = useContext(UserContext);
  const { setNotificationsList } = useContext(NotificationsContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const url = response.notification.request.content.data.url;
        Linking.openURL(url);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification(specificTime) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `It's ${specificTime}`,
        body: "Time to take your medications!",
        data: {
          url: `exp://${pathwayURL}:19000/--/medications`,
        },
      },
      trigger: {
        hour: parseInt(specificTime.slice(0, 2)),
        minute: parseInt(specificTime.slice(3, 5)),
        repeats: true,
      },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  // set start date
  const today = new Date();

  const calendarStartDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const handleDateModalPress = () => {
    setDateModal(!dateModal);
  };

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
  };

  //  set end date
  const calendarEndDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };

  //  set time

  const handleTimeModalPress = () => {
    setTimeModal(!timeModal);
  };

  const handleNotifications = async (specificTime) => {
    await schedulePushNotification(specificTime);
  };

  const handleSubmit = () => {
    const db = getDatabase();
    const postData = { startDate: startDate, endDate: endDate, time: time };
    const postReference = ref(db, `users/${userId}/notifications`);
    const newPostRef = push(postReference);
    set(newPostRef, postData);
    setNotificationsList((currentNotifications) => {
      return [...currentNotifications, postData];
    });

    time.map((specificTime) => {
      handleNotifications(specificTime);
    });

    if (notificationsModalOpen) {
      setNotificationsModalOpen(false);
    } else if (modalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <View>
      {/* Start/End Date */}
      <TouchableOpacity>
        <View style={styles.displayDate}>
          <Text>Start Date: {startDate}</Text>
          <Text>End Date: {endDate}</Text>
        </View>
        <TouchableOpacity onPress={handleDateModalPress}>
          <Text style={styles.setDatebtn}>Click to add start/end date</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={dateModal}>
        <View style={styles.centeredView}>
          <View style={styles.dateView}>
            <DatePicker
              mode="calendar"
              minimumDate={calendarStartDate}
              selected={startDate}
              onDateChange={(selected) => handleStartDateChange(selected)}
            />
            <DatePicker
              mode="calendar"
              minimumDate={calendarEndDate}
              selected={endDate}
              onDateChange={(selected) => handleEndDateChange(selected)}
            />
            <TouchableOpacity onPress={handleDateModalPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time */}
      <TouchableOpacity>
        <View style={styles.displayDate}>
          <Text>Time: {time}</Text>
        </View>

        <TouchableOpacity onPress={handleTimeModalPress}>
          <Text style={styles.setDatebtn}>Click to Add Time</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={timeModal}>
        <View style={styles.centeredView}>
          <View style={styles.dateView}>
            <DatePicker
              mode="time"
              minuteInterval={1}
              onTimeChange={(time) => {
                setTime((currentTimeArray) => {
                  return [...currentTimeArray, time];
                });
              }}
            />
            <TouchableOpacity onPress={handleTimeModalPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PushNotifications;

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#ADD8E6",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    marginHorizontal: 80,
  },
  btnText: {
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  dateView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  displayDate: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  setDatebtn: {
    textAlign: "center",
    backgroundColor: "#F2F2F2",
    borderColor: "#000000",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 50,
    marginVertical: 20,
  },
});

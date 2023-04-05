import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  LogBox,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import DatePicker from "react-native-modern-datepicker";
import { getDatabase, set, ref, push } from "firebase/database";
import { UserContext } from "../contexts/User";
import { NotificationsContext } from "../contexts/Notifications";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

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
  newMedication,
  dosage,
  unit,
  medicationType,
  quantity,
  startDate,
  endDate,
}) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [timeModal, setTimeModal] = useState(false);
  const [time, setTime] = useState([]);

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

  //  set time

  const handleTimeModalPress = () => {
    setTimeModal(!timeModal);
  };

  const handleNotifications = async (specificTime) => {
    await schedulePushNotification(specificTime);
  };

  const handleSubmit = () => {
    const db = getDatabase();
    const postReference = ref(db, `users/${userId}/notifications`);
    const newPostRef = push(postReference);
    const postId = newPostRef.key;
    const postData = [];
    time.map((specificTime) => {
      postData.push({
        id: `NN${postId}-${postData.length}`,
        name: newMedication,
        startDate: startDate,
        endDate: endDate,
        time: specificTime,
        dosage: dosage,
        unit: unit,
        form: medicationType,
        quantity: quantity,
        taken: false,
      });
    });

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

  // const handleDelete = () => {
  //   Notifications.cancelAllScheduledNotificationsAsync();
  //   console.log("All notifications deleted");
  // };

  const handleDeleteTime = (item) => {
    setTime((prevTimes) => {
      return prevTimes.filter((specificTime) => specificTime !== item);
    });
  };

  // displayDate: {
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: 10,
  //   marginHorizontal: 20,
  //   marginVertical: 10,
  // },

  const handleCloseModalPress = () => {
    setTimeModal(!timeModal);
  };

  return (
    <View>
      {/* Time */}
      <TouchableOpacity>
        <View className="flex flex-col mx-4 my-4">
          <Text className="text-center font-bold mt-6">Time(s):</Text>
          <FlatList
            className="mt-4"
            scrollEnabled={false}
            data={time}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity className="bg-whiteGrey flex flex-row justify-between items-center px-4 py-4 my-2 rounded-md">
                  <Text>{item}</Text>
                  <TouchableOpacity className="flex-initial flex-row items-center gap-x-1">
                    <Text>Delete</Text>
                    <MaterialIcons
                      name="delete-outline"
                      size={26}
                      color="black"
                      onPress={() => handleDeleteTime(item)}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleCloseModalPress}
          className="bg-whiteGrey border-2 border-black rounded-xl mx-4 mt-2 py-3"
        >
          <Text className="text-black font-bold text-center">
            Click to Add Time
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={timeModal}>
        <View className="flex-1 justify-center items-center">
          <View
            // style={styles.dateView}
            className="w-60 h-70 shadow-md shadow-slate-600"
          >
            <DatePicker
              className="rounded-md"
              mode="time"
              minuteInterval={1}
              onTimeChange={(time) => {
                setTime((currentTimeArray) => {
                  return [...currentTimeArray, time];
                });
                handleCloseModalPress();
              }}
            />
          </View>
          <TouchableOpacity className="mt-3" onPress={handleTimeModalPress}>
            <Text className="bg-whiteGrey text-black font-bold border-2 border-black text-center w-15 p-3 rounded-xl">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View className="flex flex-col items-center">
        <TouchableOpacity
          className="bg-purpleLight rounded-xl mt-8 w-56 mb-5 py-3"
          onPress={handleSubmit}
        >
          <Text className="text-base font-bold text-center my-2 text-white">
            Save Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.btn} onPress={handleDelete}>
        <Text style={styles.btnText}>Cancel All Notifications</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default PushNotifications;

const styles = StyleSheet.create({
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
});

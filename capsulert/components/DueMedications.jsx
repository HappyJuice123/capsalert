import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { UserContext } from "../contexts/User";
import { AntDesign } from "@expo/vector-icons";
import PushNotifications from "./PushNotifications";
import { DueMedicationsItem } from "./DueMedicationsItem";

const DueMedications = () => {
  //   const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().notifications) {
            const uniqueKey = Object.keys(snapshot.val().notifications);
            const snapshotNotifications = [snapshot.val().notifications];
            const notificationsArray = [];
            uniqueKey.map((key) => {
              notifications.push(snapshot.val().notifications[key]);
            });
            console.log(
              snapshotNotifications,
              "<<< snapshot.val.notifications"
            );
            console.log(uniqueKey, "<<< unique key");
            console.log(notificationsArray, "<<< notificationsArray");
            setNotifications(notificationsArray);
          } else {
            console.log("No data available");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      {/* <Modal visible={modalOpen} animationType="slide">
        <ScrollView>
          <AntDesign
            name="closesquare"
            size={30}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            color="black"
            onPress={() => setModalOpen(false)}
          />

          {/* <PushNotifications
            setNotifications={setNotifications}
            setModalOpen={setModalOpen}
          /> */}
      {/* </ScrollView>
      </Modal> */}{" "}
      */
      {/* <TouchableOpacity>
        <Text style={styles.addMedsBtn} onPress={() => setModalOpen(true)}>
          {" "}
          Add Notification{" "}
        </Text>
      </TouchableOpacity> */}
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={notifications}
        renderItem={({ item }) => <DueMedicationsItem item={item} />}
      ></FlatList>
    </View>
  );
};

export default DueMedications;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fff",
    fontSize: 8,
  },
  addMedsBtn: {
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
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
  },
  modalToggle: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginHorizontal: 40,
    marginBottom: 0,
  },
});

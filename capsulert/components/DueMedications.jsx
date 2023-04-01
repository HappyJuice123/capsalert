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
// import { NotificationsContext } from "../contexts/Notifications";
// import { AntDesign } from "@expo/vector-icons";
// import PushNotifications from "./PushNotifications";
import { DueMedicationsItem } from "./DueMedicationsItem";

const DueMedications = () => {
  // const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useContext(UserContext);
  const [dueMedicationsList, setDueMedicationsList] = useState([]);

  useEffect(() => {
    getDueMedications();
  }, []);

  const getDueMedications = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().medications) {
            const uniqueKey = Object.keys(snapshot.val().medications);
            const snapshotDueMedications = [snapshot.val().medications];
            const dueMedicationsArray = [];
            uniqueKey.map((key) => {
              dueMedicationsArray.push(snapshot.val().medications[key]);
            });
            console.log(
              snapshotDueMedications,
              "<<< snapshot.val.notifications"
            );
            console.log(uniqueKey, "<<< unique key");
            console.log(dueMedicationsArray, "<<< notificationsArray");
            setDueMedicationsList(dueMedicationsArray);
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
        {/* <ScrollView>
          <AntDesign
            name="closesquare"
            size={30}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            color="black"
            onPress={() => setModalOpen(false)}
          />
          <PushNotifications
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </ScrollView> */}
      {/* </Modal> */}
      {/* <TouchableOpacity>
        <Text style={styles.addMedsBtn} onPress={() => setModalOpen(true)}>
          Add Notification
        </Text>
      </TouchableOpacity> */}
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={dueMedicationsList}
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

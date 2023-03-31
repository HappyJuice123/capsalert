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
import { AddMedication } from "./AddMedication";
import { MyMedicationsItem } from "./MyMedicationsItem";
import { AntDesign } from "@expo/vector-icons";

export function MyMedications({ route }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);

  const setNotifications = route.params.setNotifications;
  console.log(setNotifications);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    getMedications();
  }, []);

  const getMedications = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().medications) {
            const uniqueKey = Object.keys(snapshot.val().medications);
            const snapshotMedications = [snapshot.val().medications];
            const medicationsArray = [];
            uniqueKey.map((key) => {
              medicationsArray.push(snapshot.val().medications[key]);
            });
            console.log(snapshotMedications, "<<< snapshot.val.medications");
            console.log(uniqueKey, "<<< unique key");
            console.log(medicationsArray, "<<< medicationsArray");
            setMedications(medicationsArray);
          } else {
            console.log("No data available");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (item) => {
    setMedications((prevmedications) => {
      return prevmedications.filter((medication) => medication !== item);
    });
  };

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <ScrollView>
          <AntDesign
            name="closesquare"
            size={30}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            color="black"
            onPress={() => setModalOpen(false)}
          />

          <AddMedication
            setMedications={setMedications}
            setModalOpen={setModalOpen}
            setNotifications={setNotifications}
          />
        </ScrollView>
      </Modal>

      <TouchableOpacity>
        <Text style={styles.addMedsBtn} onPress={() => setModalOpen(true)}>
          {" "}
          Add Medication{" "}
        </Text>
      </TouchableOpacity>

      <FlatList
        style={styles.list}
        data={medications}
        renderItem={({ item }) => (
          <MyMedicationsItem item={item} handleDelete={handleDelete} />
        )}
      ></FlatList>
    </View>
  );
}

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

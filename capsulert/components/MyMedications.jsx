import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { UserContext } from "../contexts/User";
import { AddMedication } from "./AddMedication";
import { MyMedicationsItem } from "./MyMedicationsItem";
import { AntDesign } from "@expo/vector-icons";

export function MyMedications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);

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
            const uniqueKeys = Object.keys(snapshot.val().medications);
            const medicationsArray = [];
            uniqueKeys.map((key) => {
              medicationsArray.push(snapshot.val().medications[key]);
            });
            setMedications(medicationsArray);
          } else {
            console.log("No data available");
            setMedications([]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (item) => {
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    get(child(dbRef, `users/${userId}/medications`))
      .then((snapshot) => {
        const medicationList = snapshot.val();
        console.log(medicationList, "<<<< medicationListMM");

        for (const medication in medicationList) {
          console.log(medication, "<<<< medication");

          get(child(dbRef, `users/${userId}/medications/${medication}`)).then(
            (snapshot) => {
              const medicationInDatabase = snapshot.val();
              console.log(medicationInDatabase, "<<<< medicationInDatabase");

              if (medicationInDatabase.id === item.id) {
                console.log(
                  medicationInDatabase.id,
                  "<<<< medicationInDatabase.id"
                );
                console.log(item.id, "<<<< item.id");
                const key = medication;
                console.log(key, "<<<< key");
                remove(ref(db, `users/${userId}/medications/${key}`));
              }
              setMedications((medicationsResult) => {
                return medicationsResult.filter(
                  (medication) => medication !== item
                );
              });
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ScrollView>
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
        scrollEnabled={false}
        style={styles.list}
        data={medications}
        renderItem={({ item }) => (
          <MyMedicationsItem item={item} handleDelete={handleDelete} />
        )}
      ></FlatList>
    </ScrollView>
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

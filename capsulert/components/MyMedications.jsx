import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  ScrollView,
  Modal,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { UserContext } from "../contexts/User";
import { MedicationsContext } from "../contexts/Medications";
import { AddMedication } from "./AddMedication";
import { MyMedicationsItem } from "./MyMedicationsItem";
import { AntDesign } from "@expo/vector-icons";

export function MyMedications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [medications, setMedications] = useState([]);

  const { userId } = useContext(UserContext);
  const { setMedicationData } = useContext(MedicationsContext);

  useEffect(() => {
    getMedications();
  }, [medications]);

  const getMedications = () => {
    const db = ref(getDatabase());
    get(child(db, `users/${userId}`))
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

        for (const medication in medicationList) {
          get(child(dbRef, `users/${userId}/medications/${medication}`)).then(
            (snapshot) => {
              const medicationInDatabase = snapshot.val();

              if (medicationInDatabase.id === item.id) {
                const key = medication;
                remove(ref(db, `users/${userId}/medications/${key}`));
                setMedications((medicationsResult) => {
                  return medicationsResult.filter(
                    (medication) => medication !== item
                  );
                });
              } else {
                console.log("ID does not match");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error, "<<<error");
      });
  };
  return (
    <ScrollView className="bg-whiteGrey">
      <Modal visible={modalOpen} animationType="slide">
        <ScrollView>
          <AntDesign
            name="closesquare"
            size={30}
            className="self-center"
            color="black"
            onPress={() => setModalOpen(false)}
          />

          <AddMedication
            setMedications={setMedications}
            setModalOpen={setModalOpen}
            editData={editData}
            setEditData={setEditData}
          />
        </ScrollView>
      </Modal>
      <View className="flex-1 items-center">
        <TouchableOpacity
          className="bg-purpleLight rounded-xl mt-10 w-56 mb-5 py-3"
          onPress={() => {
            setModalOpen(true);
            setEditData(false);
            setMedicationData([]);
          }}
        >
          <Text className="text-center my-2 text-white"> Add Medication </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        scrollEnabled={false}
        data={medications}
        renderItem={({ item }) => (
          <MyMedicationsItem
            item={item}
            handleDelete={handleDelete}
            setModalOpen={setModalOpen}
            setEditData={setEditData}
          />
        )}
      ></FlatList>
    </ScrollView>
  );
}

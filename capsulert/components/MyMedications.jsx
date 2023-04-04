import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  ScrollView,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { UserContext } from "../contexts/User";
import { MedicationsContext } from "../contexts/Medications";
import { AddMedication } from "./AddMedication";
import { MyMedicationsItem } from "./MyMedicationsItem";
import * as Speech from "expo-speech";

export function MyMedications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [medications, setMedications] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const { userId } = useContext(UserContext);
  const { medicationData, setMedicationData } = useContext(MedicationsContext);

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

  const speakDescription = () => {
    setSpeaking(true);
    options = {
      rate: 0.6,
      onStart: () => setSpeaking(true),
      onStopped: () => setSpeaking(false),
      onDone: () => setSpeaking(false),
    };

    const readDescription = `name, ${medicationData.name}, brand, ${medicationData.brand}, dosage, ${medicationData.dosage} ${medicationData.unit}, medication type, ${medicationData.form}, quantity to take, ${medicationData.quantity}, start date, ${medicationData.startDate}, end date, ${medicationData.endDate}`;

    Speech.speak(readDescription, options);
  };

  const stopSpeech = () => {
    setSpeaking(false);
    Speech.stop();
  };

  return (
    <ScrollView className="bg-whiteGrey">
      <Modal visible={modalOpen} animationType="slide">
        <ScrollView>
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
          className="bg-purpleLight rounded-xl mt-10 w-56 mb-5 py-3 mx-8 shadow-md shadow-slate-600"
          onPress={() => {
            setModalOpen(true);
            setEditData(false);
            setMedicationData([]);
          }}
        >
          <Text className="text-center my-2 text-white"> Add Medication </Text>
        </TouchableOpacity>
      </View>

      {/* Medication details pop-up */}
      <Modal animationType="slide" transparent={true} visible={detailsModal}>
        <View className="flex-1 justify-center items-center">
          <View className="mt-3 p-5">
            <TouchableOpacity
              className="text-center w-15 p-2 mb-5"
              onPress={() => {
                setDetailsModal(false);
                setMedicationData([]);
              }}
            >
              <Text className="bg-whiteGrey text-black font-bold border-2 border-black text-center w-15 p-3 rounded-xl">
                Close
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row justify-between bg-zinc-50 rounded-md shadow-md shadow-slate-600">
              <TouchableOpacity onPress={() => setDetailsModal(true)}>
                <View className="px-4 pt-5 pb-5 w-25">
                  <Text className="font-semibold text-3xl bg-whiteGrey rounded-md mb-3 py-1 px-12">
                    {medicationData.name}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">Brand: </Text>
                    {medicationData.brand}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">Dosage: </Text>
                    {medicationData.dosage}
                    {medicationData.unit}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">Medication Type: </Text>
                    {medicationData.form}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">Quantity to take: </Text>
                    {medicationData.quantity}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">Start Date: </Text>{" "}
                    {medicationData.startDate}
                  </Text>
                  <Text className="text-base mb-1">
                    <Text className="font-bold">End Date: </Text>{" "}
                    {medicationData.endDate}
                  </Text>
                  <TouchableOpacity
                    onPress={!speaking ? speakDescription : stopSpeech}
                  >
                    <Image
                      className="w-10 h-20 mx-6"
                      source={require("../assets/speaking-icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        scrollEnabled={false}
        data={medications}
        renderItem={({ item }) => (
          <MyMedicationsItem
            item={item}
            handleDelete={handleDelete}
            setModalOpen={setModalOpen}
            setEditData={setEditData}
            setDetailsModal={setDetailsModal}
          />
        )}
      ></FlatList>
    </ScrollView>
  );
}

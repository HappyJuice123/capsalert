import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { UserContext } from "../contexts/User";
import { DueMedicationsItem } from "./DueMedicationsItem";

const DueMedications = () => {
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
          if (snapshot.val().notifications) {
            const uniqueMedicationKeys = Object.keys(
              snapshot.val().notifications
            );

            const dueMedicationsArray = [];
            uniqueMedicationKeys.map((key) => {
              snapshot.val().notifications[key].forEach((medication, index) => {
                dueMedicationsArray.push({
                  ...medication,
                  index: index,
                });
              });
            });

            dueMedicationsArray.sort((a, b) => {
              if (Number(a.time.slice(0, 2)) !== Number(b.time.slice(0, 2))) {
                return a.time.slice(0, 2) - b.time.slice(0, 2);
              } else {
                return a.time.slice(3, 5) - b.time.slice(3, 5);
              }
            });

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
    <ScrollView className="bg-whiteGrey">
      <View className="flex-1 flex-row flex-wrap justify-center items-center gap-x-2 mt-5">
        <Text>Legend:</Text>
        <TouchableOpacity className="bg-lime-400 w-4 h-4 rounded-sm"></TouchableOpacity>
        <Text>Due</Text>
        <TouchableOpacity className="bg-indigo-400 w-4 h-4 rounded-sm"></TouchableOpacity>
        <Text>Taken</Text>
        <TouchableOpacity className="bg-redLight w-4 h-4 rounded-sm"></TouchableOpacity>
        <Text>Missed</Text>
        <TouchableOpacity className="bg-blue-200 w-4 h-4 rounded-sm"></TouchableOpacity>
        <Text>Future</Text>
      </View>

      <FlatList
        className="mt-3"
        scrollEnabled={false}
        data={dueMedicationsList}
        renderItem={({ item }) => <DueMedicationsItem item={item} />}
      ></FlatList>
    </ScrollView>
  );
};

export default DueMedications;

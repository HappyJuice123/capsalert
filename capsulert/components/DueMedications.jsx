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
          if (snapshot.val().medications) {
            const uniqueMedicationKeys = Object.keys(
              snapshot.val().medications
            );

            const dueMedicationsArray = [];
            uniqueMedicationKeys.map((key) => {
              snapshot.val().medications[key].time.forEach((specificTime) => {
                dueMedicationsArray.push({
                  ...snapshot.val().medications[key],
                  time: specificTime,
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
    <ScrollView style={styles.list}>
      <FlatList
        scrollEnabled={false}
        data={dueMedicationsList}
        renderItem={({ item }) => <DueMedicationsItem item={item} />}
      ></FlatList>
    </ScrollView>
  );
};

export default DueMedications;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fff",
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

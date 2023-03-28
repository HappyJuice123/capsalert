import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { AddMedication } from "./AddMedication";
import { MyMedicationsItem } from "./MyMedicationsItem";
import { AntDesign } from "@expo/vector-icons";

export function MyMedications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);

  const handleDelete = (item) => {
    setMedications((prevmedications) => {
      return prevmedications.filter((medication) => medication !== item);
    });
  };

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <View>
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
        </View>
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
  },
  addMedsBtn: {
    backgroundColor: "#c2bad8",
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 40,
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

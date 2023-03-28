import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

export const AddMedsPlaceholder = ({ setMedications, setModalOpen }) => {
  const [newMedication, setNewMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [medicationType, setMedicationType] = useState("");
  const [quantity, setQuantity] = useState("Quantity");

  const handleInput = (newMedication) => {
    setMedications((prevMedications) => {
      return [...prevMedications, newMedication];
    });
    setNewMedication("");
    setModalOpen(false);
  };

  return (
    <View styles={styles.container}>
      {/* Input Medication Name */}
      <TextInput
        placeholder={"Enter your medication"}
        style={styles.input}
        value={newMedication}
        onChangeText={(value) => setNewMedication(value)}
      />

      {/* date/time */}

      {/* Dosage */}
      <Picker
        selectedValue={dosage}
        onValueChange={(currentDosage) => setDosage(currentDosage)}
      >
        <Picker.Item label="set dosage" value="" />
        <Picker.Item label="mg" value="mg" />
        <Picker.Item label="ug" value="ug" />
        <Picker.Item label="dose3" value="dose3" />
        <Picker.Item label="dose4" value="dose4" />
      </Picker>
      {/* Form of Medication */}
      <Picker
        selectedValue={medicationType}
        onValueChange={(currentMedicationType) =>
          setMedicationType(currentMedicationType)
        }
      >
        <Picker.Item label="Type of Medication" value="" />
        <Picker.Item label="Pill" value="Pill" />
        <Picker.Item label="Liquid" value="Liquid" />
        <Picker.Item label="Syringe" value="Syringe" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      {/* Quantity */}
      <Picker
        selectedValue={quantity}
        onValueChange={(currentQuantity) => setQuantity(currentQuantity)}
      >
        <Picker.Item label="Quantity" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
      </Picker>
      {/* Set Notifications */}
      <TouchableOpacity>
        <Text style={styles.notifications}>Set Notifications </Text>
      </TouchableOpacity>
      {/* Submit Medication info */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => handleInput(newMedication)}
      >
        <Text style={styles.btnText}>Save Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 4,
  },
  btn: {
    backgroundColor: "#c2bad8",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  btnText: {
    textAlign: "center",
  },
  notifications: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
});

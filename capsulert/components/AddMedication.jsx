import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

export const AddMedication = ({ setMedications, setModalOpen }) => {
  const [newMedication, setNewMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [showDosageOption, setShowDosageOption] = useState(false);
  const [medicationType, setMedicationType] = useState("");
  const [showMedicationOption, setShowMedicationOption] = useState(false);
  const [quantity, setQuantity] = useState("");

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
        onValueChange={(currentDosage) => {
          setDosage(currentDosage);
          if (currentDosage === "other") {
            setShowDosageOption(true);
          } else {
            setShowDosageOption(false);
          }
        }}
      >
        <Picker.Item label="Dosage" value="" />
        <Picker.Item label="milligram (mg)" value="mg" />
        <Picker.Item label="microgram (μg)" value="ug" />
        <Picker.Item label="millilitre (ml)" value="ml" />
        <Picker.Item label="Other dosage" value="other" />
      </Picker>
      {/* Dosage: Show Other input */}

      {showDosageOption ? (
        <TouchableOpacity style={styles.other}>
          <Text>Other:</Text>
          <TextInput
            placeholder={"Enter dosage"}
            value={dosage}
            style={styles.otherInput}
            onChangeText={(currentDosage) => setDosage(currentDosage)}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {/* Type of Medication */}
      <Picker
        selectedValue={medicationType}
        onValueChange={(currentMedicationType) => {
          setMedicationType(currentMedicationType);
          if (currentMedicationType === "other") {
            setShowMedicationOption(true);
          } else {
            setShowMedicationOption(false);
          }
        }}
      >
        <Picker.Item label="Type of Medication" value="" />
        <Picker.Item label="Pill" value="Pill" />
        <Picker.Item label="Liquid" value="Liquid" />
        <Picker.Item label="Drops" value="Drops" />
        <Picker.Item label="Inhaler" value="Inhaler" />
        <Picker.Item label="Powder" value="Powder" />
        <Picker.Item label="Injection" value="Injection" />
        <Picker.Item label="Lozenge" value="Lozenge" />
        <Picker.Item label="Cream" value="Cream" />
        <Picker.Item label="Other type of medication" value="other" />
      </Picker>
      {/* Type of Medication: Show Other input */}

      {showMedicationOption ? (
        <TouchableOpacity style={styles.other}>
          <Text>Other:</Text>
          <TextInput
            placeholder={"Enter Type of Medication "}
            value={medicationType}
            style={styles.otherInput}
            onChangeText={(value) => setMedicationType(value)}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {/* Quantity */}
      <TouchableOpacity style={styles.quantity}>
        <Text>Quantity:</Text>
        <TextInput
          placeholder={"Enter quantity here "}
          value={quantity}
          style={styles.quantityInput}
          onChangeText={(currentQuantity) => setQuantity(currentQuantity)}
        />
      </TouchableOpacity>

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
  quantity: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  quantityInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  other: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  otherInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
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

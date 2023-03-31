import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, set, ref, push } from "firebase/database";
import { UserContext } from "../contexts/User";
import { Picker } from "@react-native-picker/picker";
// import DatePicker from "react-native-modern-datepicker";
// import { getFormatedDate } from "react-native-modern-datepicker";
import PushNotifications from "./PushNotifications";

export const AddMedication = ({
  setMedications,
  setModalOpen,
  setNotifications,
}) => {
  const [newMedication, setNewMedication] = useState("");
  // const [dateModal, setDateModal] = useState(false);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [timeModal, setTimeModal] = useState(false);
  // const [selectedTime, setSelectedTime] = useState("");
  const [unit, setUnit] = useState("");
  const [showUnitOption, setshowUnitOption] = useState(false);
  const [dosage, setDosage] = useState("");
  const [medicationType, setMedicationType] = useState("");
  const [showMedicationOption, setShowMedicationOption] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const navigation = useNavigation();

  const { userId } = useContext(UserContext);

  const handleNotificationsModalPress = () => {
    setNotificationsModalOpen(!notificationsModalOpen);
  };

  // Handle submit medication information/ firebase realtime storage

  const handleInput = () => {
    const db = getDatabase();
    const postData = {
      name: newMedication,
      dosage: dosage,
      unit: unit,
      form: medicationType,
      quantity: quantity,
    };
    const postReference = ref(db, `users/${userId}/medications`);
    const newPostRef = push(postReference);
    set(newPostRef, postData);
    setNewMedication("");
    setModalOpen(false);
    setMedications((currentMedications) => {
      return [...currentMedications, postData];
    });
  };

  return (
    <View styles={styles.container}>
      {/* Input Medication Name */}
      <TextInput
        placeholder={"Enter Medication"}
        style={styles.input}
        value={newMedication}
        onChangeText={(value) => setNewMedication(value)}
      />

      {/* Dosage/Unit */}
      <View style={styles.dosageContainer}>
        <Text>Dosage:</Text>
        {showUnitOption ? (
          <></>
        ) : (
          <TextInput
            placeholder={"Enter dosage"}
            style={styles.dosage}
            value={dosage}
            onChangeText={(value) => setDosage(value)}
          />
        )}

        <Picker
          selectedValue={unit}
          style={styles.unit}
          onValueChange={(currentUnit) => {
            setUnit(currentUnit);
            if (currentUnit === "other") {
              setshowUnitOption(true);
              setUnit("");
            } else {
              setshowUnitOption(false);
            }
          }}
        >
          <Picker.Item label="Select Unit" value={unit} />
          <Picker.Item label="milligram (mg)" value="mg" />
          <Picker.Item label="microgram (μg)" value="ug" />
          <Picker.Item label="millilitre (ml)" value="ml" />
          <Picker.Item label="Other dosage" value="other" />
        </Picker>
      </View>

      {/* Dosage: Show Other input */}
      {showUnitOption ? (
        <TouchableOpacity style={styles.customerPicker}>
          <Text>Custom Unit:</Text>
          <TextInput
            placeholder={"Enter Custom Unit"}
            value={unit}
            style={styles.otherInput}
            onChangeText={(currentUnit) => setUnit(currentUnit)}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {/* Type of Medication */}
      <View style={styles.typeContainer}>
        <Text>Type of Medication:</Text>
        <Picker
          selectedValue={medicationType}
          style={styles.typePicker}
          onValueChange={(currentMedicationType) => {
            setMedicationType(currentMedicationType);
            if (currentMedicationType === "other") {
              setShowMedicationOption(true);
              setMedicationType("");
            } else {
              setShowMedicationOption(false);
            }
          }}
        >
          <Picker.Item label="Select" value={medicationType} />
          <Picker.Item label="Pill" value="Pill" />
          <Picker.Item label="Liquid" value="Liquid" />
          <Picker.Item label="Drops" value="Drops" />
          <Picker.Item label="Inhaler" value="Inhaler" />
          <Picker.Item label="Powder" value="Powder" />
          <Picker.Item label="Injection" value="Injection" />
          <Picker.Item label="Lozenge" value="Lozenge" />
          <Picker.Item label="Cream" value="Cream" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      {/* Type of Medication: Show Other input */}
      {showMedicationOption ? (
        <TouchableOpacity style={styles.customerPicker}>
          <Text>Custom Medication Type:</Text>
          <TextInput
            placeholder={"Enter Type of Medication "}
            value={medicationType}
            style={styles.otherInput}
            onChangeText={(currentNewValue) => {
              setMedicationType(currentNewValue);
            }}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {/* Quantity */}
      <TouchableOpacity style={styles.quantity}>
        <Text>Amount to take:</Text>
        <TextInput
          placeholder={"Enter quantity here "}
          value={quantity}
          style={styles.quantityInput}
          onChangeText={(currentQuantity) => setQuantity(currentQuantity)}
        />
      </TouchableOpacity>

      {/* Set Notifications */}

      <TouchableOpacity onPress={handleNotificationsModalPress}>
        <Text style={styles.notifications}>Set Notifications </Text>
      </TouchableOpacity>
      <Modal visible={notificationsModalOpen} animationType="slide">
        <PushNotifications
          setNotificationsModalOpen={setNotificationsModalOpen}
          setNotifications={setNotifications}
        />
      </Modal>

      {/* Submit Medication info */}
      <TouchableOpacity style={styles.btn} onPress={handleInput}>
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
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 4,
    textAlign: "center",
  },
  btn: {
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
    marginHorizontal: 80,
  },
  btnText: {
    textAlign: "center",
  },
  customerPicker: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  otherInput: {
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  select: {
    borderColor: "#F2F2F2",
    borderWidth: 1,
    borderRadius: 5,
  },
  notifications: {
    backgroundColor: "#F2F2F2",
    textAlign: "center",
    borderColor: "#000000",
    borderWidth: 1.5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingLeft: 60,
    paddingRight: 60,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  dosageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
  },
  dosage: {
    borderColor: "#000",
    borderWidth: 0.7,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  unit: {
    width: 200,
  },
  typeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 50,
  },
  typePicker: {
    width: 150,
  },
  quantity: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  quantityInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

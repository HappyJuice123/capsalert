import React, { useState, useEffect, useContext } from "react";
import { TextInput, TouchableOpacity, Text, Modal, View } from "react-native";
import {
  getDatabase,
  set,
  ref,
  push,
  update,
  get,
  child,
} from "firebase/database";
import { UserContext } from "../contexts/User";
import { MedicationsContext } from "../contexts/Medications";
import { Picker } from "@react-native-picker/picker";
import PushNotifications from "./PushNotifications";
import { AntDesign } from "@expo/vector-icons";
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";

export const AddMedication = ({
  setMedications,
  setModalOpen,
  editData,
  setEditData,
}) => {
  const [newMedication, setNewMedication] = useState("");
  const [medicationBrand, setMedicationBrand] = useState("");
  const [unit, setUnit] = useState("");
  const [showUnitOption, setshowUnitOption] = useState(false);
  const [dosage, setDosage] = useState("");
  const [medicationType, setMedicationType] = useState("");
  const [showMedicationOption, setShowMedicationOption] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { userId } = useContext(UserContext);
  const { medicationData } = useContext(MedicationsContext);

  const medicationToUpdate = medicationData;

  const handleNotificationsModalPress = () => {
    setNotificationsModalOpen(!notificationsModalOpen);
  };

  // set start date
  const today = new Date();

  const calendarStartDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const handleDateModalPress = () => {
    setDateModal(!dateModal);
  };

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
  };

  //  set end date
  const calendarEndDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };

  // Handle submit medication information/ firebase realtime storage

  const handleInput = () => {
    const db = getDatabase();
    const postReference = ref(db, `users/${userId}/medications`);
    const newPostRef = push(postReference);
    const postId = newPostRef.key;
    const postData = {
      id: `MM${postId}`,
      name: newMedication,
      brand: medicationBrand,
      dosage: dosage,
      unit: unit,
      form: medicationType,
      quantity: quantity,
      startDate: startDate,
      endDate: endDate,
    };
    set(newPostRef, postData);
    setNewMedication("");
    setModalOpen(false);
    setMedications((currentMedications) => {
      return [...currentMedications, postData];
    });
  };

  useEffect(() => {
    getMedicationsToUpdate(medicationToUpdate);
  }, []);

  const getMedicationsToUpdate = (medicationToUpdate) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/medications`))
      .then((snapshot) => {
        const medicationList = snapshot.val();

        for (const medication in medicationList) {
          get(child(dbRef, `users/${userId}/medications/${medication}`)).then(
            (snapshot) => {
              const medicationInDatabase = snapshot.val();

              if (medicationInDatabase.id === medicationToUpdate.id) {
                setNewMedication(medicationToUpdate.name);
                setMedicationBrand(medicationToUpdate.brand);
                setUnit(medicationToUpdate.unit);
                setDosage(medicationToUpdate.dosage);
                setMedicationType(medicationToUpdate.form);
                setQuantity(medicationToUpdate.quantity);
                setStartDate(medicationToUpdate.startDate);
                setEndDate(medicationToUpdate.endDate);
              } else {
                console.log("no data to update");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (medicationData) => {
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    get(child(dbRef, `users/${userId}/medications`))
      .then((snapshot) => {
        const medicationList = snapshot.val();

        for (const medication in medicationList) {
          get(child(dbRef, `users/${userId}/medications/${medication}`))
            .then((snapshot) => {
              const medicationInDatabase = snapshot.val();

              if (medicationInDatabase.id === medicationData.id) {
                const key = medication;

                const medicationRef = ref(
                  db,
                  `users/${userId}/medications/${key}`
                );
                update(medicationRef, {
                  ...medicationData,
                  name: newMedication,
                  brand: medicationBrand,
                  dosage: dosage,
                  unit: unit,
                  form: medicationType,
                  quantity: quantity,
                  startDate: startDate,
                  endDate: endDate,
                });
              }
              setMedications((currentMedications) => {
                return [...currentMedications];
              });
              setModalOpen(false);
              setEditData(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="text-center">
      {/* Close Modal button */}
      <View className="flex justify-center items-center mt-10 mb-2">
        <TouchableOpacity onPress={() => setModalOpen(false)}>
          <Text className="font-bold text-black text-center bg-whiteGrey border-2 border-black rounded-xl w-20 p-2">
            Close
          </Text>
        </TouchableOpacity>
      </View>

      {/* Medication Name */}
      <View className="flex items-center text-whiteGrey mt-8">
        <Text className="mb-3 font-bold">Name</Text>
        <TextInput
          placeholder={"Enter Medication"}
          className="border-2 border-whiteGrey rounded-xl w-60 mb-5 p-2 text-center"
          value={newMedication}
          onChangeText={(value) => setNewMedication(value)}
        />
      </View>
      {/* Medication Brand Name */}
      <View className="flex items-center">
        <Text className="mb-3 font-bold ">Brand</Text>
        <TextInput
          placeholder={"Enter Medication Brand"}
          className="border-2 border-whiteGrey rounded-xl w-60 mb-5 p-2 text-center"
          value={medicationBrand}
          onChangeText={(value) => setMedicationBrand(value)}
        />
      </View>
      {/* Dosage */}
      <View className="flex items-center gap-2">
        <Text className="mb-3 font-bold">Dosage</Text>
        <TextInput
          placeholder={"Enter Dosage"}
          className="border-2 border-whiteGrey rounded-xl w-60 mb-5 p-2 text-center"
          value={dosage}
          onChangeText={(value) => setDosage(value)}
        />
      </View>

      {/* Unit */}
      <View className="flex items-center">
        <Text className="mb-3 font-bold">Unit</Text>
      </View>
      <View className="border-2 border-whiteGrey rounded-xl w-65 mb-2 text-center mx-20">
        <Picker
          selectedValue={unit}
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
          <Picker.Item label="Select" value={unit} />
          <Picker.Item label="milligram (mg)" value="mg" />
          <Picker.Item label="microgram (μg)" value="ug" />
          <Picker.Item label="millilitre (ml)" value="ml" />
          <Picker.Item label="Other dosage" value="other" />
        </Picker>
      </View>

      {/* unit: Show Other input */}
      {showUnitOption ? (
        <View className="flex items-center mt-5">
          <Text className="mb-3 font-bold">Custom Unit</Text>
          <TouchableOpacity>
            <TextInput
              placeholder={"Enter Custom Unit"}
              value={unit}
              className="border-2 border-whiteGrey rounded-xl w-60 mb-2 p-2 text-center"
              onChangeText={(currentUnit) => setUnit(currentUnit)}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {/* Type of Medication */}
      <View className="flex items-center mt-5">
        <Text className="mb-3 font-bold">Medication type</Text>
      </View>
      <View className="border-2 border-whiteGrey rounded-xl w-65 mb-2 text-center mx-20">
        <Picker
          selectedValue={medicationType}
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
          <Picker.Item
            label={editData ? medicationType : "Select"}
            value={medicationType}
          />
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
        <View className="flex items-center mt-5">
          <Text className="font-bold">Custom Medication Type</Text>
          <TouchableOpacity>
            <TextInput
              placeholder={"Enter Type of Medication "}
              value={medicationType}
              className="border-2 border-whiteGrey rounded-xl w-60 mt-3 mb-2 p-2 text-center"
              onChangeText={(currentNewValue) => {
                setMedicationType(currentNewValue);
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* Quantity */}
      <TouchableOpacity className="flex items-center mt-4">
        <Text className="mb-3 font-bold">Quantity to take</Text>
        <TextInput
          placeholder={"Enter quantity here"}
          value={quantity}
          className="border-2 border-whiteGrey rounded-xl w-60 mb-2 p-2 text-center"
          onChangeText={(currentQuantity) => setQuantity(currentQuantity)}
        />
      </TouchableOpacity>

      {/* Start/End Date */}
      <TouchableOpacity>
        <View>
          <View className="flex items-center mt-5">
            <Text className="font-bold">Start Date </Text>
            <Text className="border-2 border-whiteGrey rounded-xl w-60 mt-3 mb-5 p-3 text-center">
              {startDate}
            </Text>
            <Text className="font-bold">End Date </Text>
            <Text className="border-2 border-whiteGrey rounded-xl w-60 mt-3 mb-6 p-3 text-center">
              {endDate}
            </Text>
          </View>
        </View>
        <View className="flex items-center">
          <TouchableOpacity
            className="border-2 border-whiteGrey rounded-xl w-50 mb-5 p-3 text-center"
            onPress={handleDateModalPress}
          >
            {editData ? (
              <Text>Click to update start/end date</Text>
            ) : (
              <Text>Click to add start/end date</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={dateModal}>
        <View className="flex-1 justify-center items-center">
          <View className="mt-3 w-3/5">
            <TouchableOpacity
              className="text-center w-15 p-2 mb-5"
              onPress={handleDateModalPress}
            >
              <Text className="bg-whiteGrey text-black font-bold border-2 border-black text-center w-15 p-3 rounded-xl shadow-md shadow-slate-600">
                Close
              </Text>
            </TouchableOpacity>
            <DatePicker
              mode="calendar"
              minimumDate={calendarStartDate}
              selected={startDate}
              onDateChange={(selected) => handleStartDateChange(selected)}
            />
            <DatePicker
              mode="calendar"
              minimumDate={calendarEndDate}
              selected={endDate}
              onDateChange={(selected) => handleEndDateChange(selected)}
            />
          </View>
        </View>
      </Modal>

      {/* Set Notifications */}
      <View className="flex items-center">
        <TouchableOpacity
          className="bg-whiteGrey border-2 border-black rounded-xl mt-2 w-80 py-3 shadow-md shadow-slate-600"
          onPress={handleNotificationsModalPress}
        >
          <Text className="text-black font-bold text-center">
            Set Notification{" "}
          </Text>
        </TouchableOpacity>
        <Modal visible={notificationsModalOpen} animationType="slide">
          <View className="flex justify-center items-center mt-10 mb-2">
            <TouchableOpacity onPress={() => setNotificationsModalOpen(false)}>
              <Text className="font-bold text-black text-center bg-whiteGrey border-2 border-black rounded-xl w-20 p-2">
                Close
              </Text>
            </TouchableOpacity>
          </View>

          <PushNotifications
            notificationsModalOpen={notificationsModalOpen}
            setNotificationsModalOpen={setNotificationsModalOpen}
            newMedication={newMedication}
            dosage={dosage}
            unit={unit}
            medicationType={medicationType}
            quantity={quantity}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Modal>
      </View>
      {/* Submit Medication info */}
      {editData ? (
        <View className="flex items-center">
          <TouchableOpacity
            className="bg-purpleLight rounded-xl mt-8 w-56 mb-5 py-3 shadow-md shadow-slate-600"
            onPress={() => handleEdit(medicationData)}
          >
            <Text className="text-center my-2 text-white">
              {/* SAVE MEDICATION  */}
              Save Medication
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex items-center">
          <TouchableOpacity
            className="bg-purpleLight rounded-xl mt-8 w-56 mb-5 py-3 shadow-md shadow-slate-600"
            onPress={handleInput}
          >
            <Text className="text-base font-bold text-center my-2 text-white">
              {/* ADD MEDICATION  */}
              Add Medication
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

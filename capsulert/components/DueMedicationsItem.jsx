import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { getDatabase, ref, update } from "firebase/database";
import { UserContext } from "../contexts/User";

export const DueMedicationsItem = ({ item }) => {
  const [toggleMedTaken, setToggleMedTaken] = useState(item.taken);

  const { userId } = useContext(UserContext);

  let today = new Date();
  const notificationId = item.id.slice(2, -2);

  const handleTimeStyle = () => {
    if (Number(item.time.slice(3, 5)) >= 30) {
      if (
        Number(item.time.slice(0, 2)) - today.getHours() === 0 &&
        Number(item.time.slice(3, 5)) - today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - Number(item.time.slice(0, 2)) === 1 &&
        60 - Number(item.time.slice(3, 5)) + today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - Number(item.time.slice(0, 2)) === 1 &&
        60 - Number(item.time.slice(3, 5)) + today.getMinutes() > 30
      ) {
        return styles.medMissed;
      } else if (today.getHours() - Number(item.time.slice(0, 2) > 1)) {
        return styles.medMissed;
      } else {
        return styles.time;
      }
    } else if (Number(item.time.slice(3, 5) < 30)) {
      if (
        Number(item.time.slice(0, 2)) - today.getHours() === 1 &&
        60 - today.getMinutes() + Number(item.time.slice(3, 5)) <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - Number(item.time.slice(0, 2)) === 0 &&
        today.getMinutes() - Number(item.time.slice(3, 5)) <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - Number(item.time.slice(0, 2)) === 0 &&
        today.getMinutes() - Number(item.time.slice(3, 5)) > 30
      ) {
        return styles.medMissed;
      } else if (today.getHours() - Number(item.time.slice(0, 2)) >= 1) {
        return styles.medMissed;
      } else {
        return styles.time;
      }
    }
  };

  const handleMedTaken = () => {
    const db = getDatabase();
    const updateRef = ref(
      db,
      `users/${userId}/notifications/${notificationId}/${item.index}`
    );

    if (toggleMedTaken === false) {
      update(updateRef, { taken: true });
      setToggleMedTaken(true);
    } else {
      update(updateRef, { taken: false });
      setToggleMedTaken(false);
    }
  };

  return (
    <TouchableOpacity
      className="bg-zinc-50 mx-8 my-4 rounded-md shadow-md shadow-slate-600"
      onPress={() => {
        handleMedTaken();
      }}
    >
      <View className="text-xs px-4 pt-3 pb-4">
        <Text className="mb-1 text-lg font-semibold">
          {item.name} {item.dosage} {item.unit}
        </Text>
        <Text>
          take {item.quantity} {item.form}(s)
        </Text>
      </View>
      <View>
        {toggleMedTaken ? (
          <Text style={styles.medTaken}>Taken</Text>
        ) : (
          <Text style={handleTimeStyle()}>Due at: {item.time}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  time: {
    backgroundColor: "#bfdbfe",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  dueTime: {
    backgroundColor: "#a3e635",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  medTaken: {
    backgroundColor: "#8a7099",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  medMissed: {
    backgroundColor: "#fcbbbb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
});

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
    if (item.time.slice(3, 5) >= 30) {
      if (
        item.time.slice(0, 2) - today.getHours() === 0 &&
        item.time.slice(3, 5) - today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - item.time.slice(0, 2) === 1 &&
        60 - item.time.slice(3, 5) + today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - item.time.slice(0, 2) === 1 &&
        60 - item.time.slice(3, 5) + today.getMinutes() > 30
      ) {
        return styles.medMissed;
      } else if (today.getHours() - item.time.slice(0, 2) > 1) {
        return styles.medMissed;
      } else {
        return styles.time;
      }
    } else if (item.time.slice(3, 5) < 30) {
      if (
        item.time.slice(0, 2) - today.getHours() === 1 &&
        60 - today.getMinutes() + item.time.slice(3, 5) <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - item.time.slice(0, 2) === 0 &&
        today.getMinutes() - item.time.slice(3, 5) <= 30
      ) {
        return styles.dueTime;
      } else if (
        today.getHours() - item.time.slice(0, 2) === 0 &&
        today.getMinutes() - item.time.slice(3, 5) > 30
      ) {
        return styles.medMissed;
      } else if (today.getHours() - item.time.slice(0, 2) >= 1) {
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
      style={styles.listItem}
      onPress={() => {
        handleMedTaken();
      }}
    >
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>
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
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 14,
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999999",
  },
  itemTextContainer: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemText: {
    marginBottom: 4,
  },
  time: {
    backgroundColor: "lightblue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  dueTime: {
    backgroundColor: "lightgreen",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  medTaken: {
    backgroundColor: "#1d62f5",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
  medMissed: {
    backgroundColor: "pink",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
  },
});

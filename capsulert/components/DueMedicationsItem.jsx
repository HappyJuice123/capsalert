import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export const DueMedicationsItem = ({ item }) => {
  const [toggleMedTaken, setToggleMedTaken] = useState(false);

  let today = new Date();

  const handleTimeStyle = () => {
    if (item.time.slice(3, 5) >= 30) {
      if (
        item.time.slice(0, 2) - today.getHours() === 0 &&
        item.time.slice(3, 5) - today.getMinutes() <= 30
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
    } else if (item.time.slice(3, 5) < 30) {
      if (
        item.time.slice(0, 2) - today.getHours() === 1 &&
        60 - today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (
        item.time.slice(0, 2) - today.getHours() === 0 &&
        today.getMinutes() <= 30
      ) {
        return styles.dueTime;
      } else if (today.getHours() - item.time.slice(0, 2) >= 1) {
        return styles.medMissed;
      } else {
        return styles.time;
      }
    }
  };

  const handleMedTaken = () => {
    if (toggleMedTaken === false) {
      setToggleMedTaken(true);
    } else {
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

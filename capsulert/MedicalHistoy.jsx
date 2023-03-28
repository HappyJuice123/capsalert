import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

const MedicalHistory = () => {
  const [text, onChangeText] = useState("");
  const [list, setList] = useState([]);
  // console.log(text);
  // console.log(list);
  const handleSubmit = (text) => {
    if (list.length === 0) {
      setList((key = { text }[text]));
      //console.log(list);
    } else {
      setList([text, ...list]);
    }
  };
  const handleRemove = (item) => {
    console.log(item);
    // console.log(...list);
    const removedItemArray = list.filter((e) => e !== item);
    setList(removedItemArray);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical History</Text>
      <TextInput
        style={styles.input}
        placeholder="Add to your medical history..."
        onChangeText={onChangeText}
        value={text}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.add} onPress={() => handleSubmit(text)}>
          Add
        </Text>
      </TouchableOpacity>

      <Text style={styles.yourHistory}>Your medical history</Text>

      <View style={styles.boxList}>
        <ScrollView>
          {list
            ? list.map((item) => {
                return (
                  <View>
                    <Text>{item}</Text>
                    {console.log(item)}
                    <TouchableOpacity
                      key={item}
                      style={styles.removeButton}
                      onPress={() => handleRemove(item)}
                    >
                      <Text>Remove</Text>
                      {/* {console.log(item)} */}
                    </TouchableOpacity>
                  </View>
                );
              })
            : (setList([]), (<Text>add to your history</Text>))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderColor: "#000000",
    borderWidth: 3,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    paddingLeft: 20,
  },
  title: {
    fontSize: 30,
    textAlignVertical: "top",
    marginTop: 100,
    textAlign: "left",
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: "#ADD8E6",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 20,
    width: 100,
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 40,
  },
  yourHistory: {
    fontSize: 20,
    marginTop: 20,
    // textDecorationLine: "underline",
    marginLeft: 20,
  },
  boxList: {
    backgroundColor: "#ADD8E6",
    margin: 20,
    borderColor: "#000000",
    borderWidth: 1,
  },
  add: {
    fontSize: 15,
  },
  removeButton: {
    borderColor: "#000000",
    borderWidth: 2,
  },
});
export default MedicalHistory;

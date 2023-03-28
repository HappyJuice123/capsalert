import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const MedicalHistory = () => {
  const [newInput, setNewInput] = useState("");
  const [list, setList] = useState([]);
  // console.log(text);
  // console.log(list);
  const handleSubmit = (newInput) => {
    setList((currentList) => {
      return [...currentList, newInput];
    });
    setNewInput("");
  };
  const handleRemove = (item) => {
    // console.log(item);
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
        onChangeText={(value) => {
          setNewInput(value);
        }}
        value={newInput}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.add} onPress={() => handleSubmit(newInput)}>
          Add
        </Text>
      </TouchableOpacity>
      {console.log(list)}
      <Text style={styles.yourHistory}>Your medical history</Text>

      <FlatList
        style={styles.flatlist}
        data={list}
        renderItem={({ item }) => {
          <Text>{item}</Text>;
        }}
      ></FlatList>
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
  flatlist: {
    backgroundColor: "#ADD8E6",
  },
});
export default MedicalHistory;
{
  /* {list
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
                      {/* {console.log(item)} */
}
{
  /* </TouchableOpacity>
                  </View>
                );
              })
            : (setList([]), (<Text>add to your history</Text>))} */
}

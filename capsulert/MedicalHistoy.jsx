import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./contexts/User";
import {
  getDatabase,
  set,
  ref,
  push,
  remove,
  get,
  child,
} from "firebase/database";
const MedicalHistory = () => {
  const [newInput, setNewInput] = useState("");
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  const { userId } = useContext(UserContext);

  const handleSubmit = (newInput) => {
    setList((currentList) => {
      return [...currentList, newInput];
    });
    setNewInput("");
  };
  const handleRemove = (item) => {
    const removedItemArray = list.filter((e) => e !== item);
    setList(removedItemArray);
    setData(...removedItemArray);
    setAddedData(...data);
  };

  const updateData = (userId, diagnosis) => {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}/diagnosis`);
    const newPostRef = push(reference);
    remove(reference);
    console.log(newPostRef, "newPost");
    console.log(diagnosis, "diagnosis");
    set(newPostRef, diagnosis);
    setData((currentData) => {
      return [...currentData, ...diagnosis];
    });
  };

  const readDatabase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().diagnosis) {
          const key = Object.keys(snapshot.val().diagnosis)[0];
          console.log(key, "key");
          console.log(snapshot.val().diagnosis[key], "59");
          setData(snapshot.val().diagnosis[key]);
          // const updates = [];
          // key.map((key) => {
          //   updates.push(snapshot.val().diagnosis[key]);
          // });
          // const lastUpdate = updates[updates.length - 1];
          // console.log(updates, "updates");
          // console.log(lastUpdate, "las");
          // setData(lastUpdate);
        }
      }
    });
  };
  useEffect(() => {
    readDatabase();
  }, [addedData]);
  {
    console.log(data, "data");
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Medical History</Text>
        <TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Add to your medical history..."
            onChangeText={(value) => {
              setNewInput(value);
            }}
            value={newInput}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleSubmit(newInput)}
          >
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.yourHistory}>Your medical history</Text>
        <FlatList
          style={styles.flatlist}
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ ...styles.itemBox }}>
              <Text style={styles.item}>{item}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item)}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        ></FlatList>
        <TouchableOpacity onPress={() => updateData(userId, list)}>
          <Text>Save</Text>
        </TouchableOpacity>
        {/* {data.map((item) => {
          return <Text>{item}</Text>;
        })} */}
        <View>
          <FlatList
            style={styles.flatlist}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ ...styles.itemBox }}>
                <Text style={styles.item}>{item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemove(item)}
                >
                  <Text>Remove</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
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
    margin: 10,
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    width: 70,
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 40,
    // textAlign: "middle",
    // verticalAlign: "center",
  },
  flatlist: {
    backgroundColor: "#ADD8E6",
    marginTop: 10,
    borderColor: "#000000",
    borderWidth: 1,
    margin: 10,
  },
  item: {
    paddingLeft: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  itemBox: {
    borderBottomColor: "#000000",
    borderWidth: 0.5,
    alignContent: "center",
  },
});
export default MedicalHistory;

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
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
  const [data, setData] = useState([]);
  const { userId } = useContext(UserContext);

  const handleSubmit = (newInput) => {
    console.log(newInput, "newInput");
    const db = getDatabase();
    const postReference = ref(db, `users/${userId}/diagnosis`);
    const newPostRef = push(postReference);
    set(newPostRef, newInput);
    setData((currentDiagnosis) => {
      return [...currentDiagnosis, newInput];
    });
    setNewInput("");
  };

  const handleRemove = (item) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().diagnosis) {
            const uniqueKey = Object.keys(snapshot.val().diagnosis);
            const snapshotDiagnosis = [snapshot.val().diagnosis];
            const diagnosisArray = [];
            uniqueKey.map((key) => {
              diagnosisArray.push(snapshot.val().diagnosis[key]);
            });
            const keyAndValues = snapshotDiagnosis.pop();
            const kVPair = Object.entries(keyAndValues);
            kVPair.map((pair) => {
              if (pair[1] === item) {
                console.log(pair);
                const db = getDatabase();
                const deleteRef = ref(
                  db,
                  `users/${userId}/diagnosis/${pair[0]}`
                );
                setData((currentData) => {
                  return currentData.filter((e) => e != item);
                });
                remove(deleteRef);
                return pair;
              }
            });
          } else {
            console.log("No data available");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDiagnosis();
  }, []);

  const getDiagnosis = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().diagnosis) {
            const uniqueKey = Object.keys(snapshot.val().diagnosis);
            const snapshotDiagnosis = [snapshot.val().diagnosis];
            const diagnosisArray = [];
            uniqueKey.map((key) => {
              diagnosisArray.push(snapshot.val().diagnosis[key]);
            });
            setData(diagnosisArray);
          } else {
            console.log("No data available");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
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
          scrollEnabled={false}
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
    </ScrollView>
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

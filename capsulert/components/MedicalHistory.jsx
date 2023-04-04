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
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
    <ScrollView className="bg-whiteGrey">
      <View className="bg-whiteGrey mt-6 ">
        {/* style={styles.container} */}
        <Text className="text-left my-5 text-greyBlack text-xl ml-3">
          Medical History
        </Text>
        {/* style={styles.title} */}
        <TouchableOpacity>
          <View className="flex items-center">
            <TextInput
              className="border-greyBlack border-2 rounded-xl w-60 mb-5 p-2 text-center"
              placeholder="Add to your medical history..."
              onChangeText={(value) => {
                setNewInput(value);
              }}
              value={newInput}
            />
            <TouchableOpacity
              className=" bg-purpleLight rounded-xl w-56 mb-5 flex items-center"
              onPress={() => handleSubmit(newInput)}
            >
              <Text className="text-center my-2 text-white">Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text className="text-left my-5 text-greyBlack text-base ml-3">
          Your medical history
        </Text>
        <View className="flex-1 items-center border-black border-t-2 ">
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                className=" bg-purpleLight rounded-xl mt-5 w-96 text-white 
              border-black border-2"
              >
                <Text className="text-white items-center pl-5 pt-2">
                  {item}{" "}
                </Text>
                <MaterialIcons
                  style={styles.icon}
                  name="delete-outline"
                  size={26}
                  color="black"
                  onPress={() => handleRemove(item)}
                ></MaterialIcons>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
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
  icon: {
    alignSelf: "flex-end",
    verticalAlign: "middle",
    padding: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
});
export default MedicalHistory;

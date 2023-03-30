import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { UserContext } from "../contexts/User";
import { getDatabase, ref, child, push, set, get } from "firebase/database";

export const AddAllergies = () => {
  const [isCelerySelected, setIsCelerySelected] = useState(false);
  const [isCerealsSelected, setIsCerealsSelected] = useState(false);
  const [isCrustaceansSelected, setIsCrustaceansSelected] = useState(false);
  const [isEggsSelected, setIsEggsSelected] = useState(false);
  const [isFishSelected, setIsFishSelected] = useState(false);
  const [isLupinSelected, setIsLupinSelected] = useState(false);
  const [isMilkSelected, setIsMilkSelected] = useState(false);
  const [isMolluscsSelected, setIsMolluscsSelected] = useState(false);
  const [isMustardSelected, setIsMustardSelected] = useState(false);
  const [isNutsSelected, setIsNutsSelected] = useState(false);
  const [isPeanutsSelected, setIsPeanutsSelected] = useState(false);
  const [isSesameSeedsSelected, setIsSesameSeedsSelected] = useState(false);
  const [isSoyaSelected, setIsSoyaSelected] = useState(false);
  const [isSulphurDioxideSelected, setIsSulphurDioxideSelected] =
    useState(false);
  const [foodAllergy, setFoodAllergy] = useState("");

  // const [isSelected, setIsSelected] = useState([
  //   ["Celery", false],
  //   ["Cereals containing gluten", false],
  //   ["Crustaceans", false],
  //   ["Eggs", false],
  //   ["Fish", false],
  //   ["Lupin", false],
  //   ["Milk", false],
  //   ["Molluscs", false],
  //   ["Mustard", false],
  //   ["Nuts", false],
  //   ["Peanuts", false],
  //   ["Sesame Seeds", false],
  //   ["Soya", false],
  //   ["Sulphur Dioxide", false],
  // ]);

  // {
  //   Celery: false,
  //   Cereals: false,
  //   Crustaceans: false,
  //   Eggs: false,
  //   Fish: false,
  //   Lupin: false,
  //   Milk: false,
  //   Molluscs: false,
  //   Mustard: false,
  //   Nuts: false,
  //   Peanuts: false,
  //   SesameSeeds: false,
  //   Soya: false,
  //   SulphurDioxide: false,
  // }

  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [readAllergyList, setReadAllergyList] = useState([]);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    readDatabase();
    if (isCelerySelected) {
      setFoodAllergy("Celery");
      setAllergies((currentAllergies) => {
        console.log(currentAllergies);
        return [...currentAllergies, foodAllergy];
      });
    } else if (!isCelerySelected) {
      setAllergies((currentAllergies) => {
        const copyAllergies = [...currentAllergies];
        const index = copyAllergies.indexOf("Celery");
        copyAllergies.splice(index, 1);
        return copyAllergies;
      });
    }
  }, [isCelerySelected]);

  const writeNewAllergyList = (userId) => {
    const db = getDatabase();
    const postData = allergies;
    const postListRef = ref(db, `users/${userId}/allergies`);
    const newPostRef = push(postListRef);
    set(newPostRef, postData);
  };

  const readDatabase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("snapshot >>>", snapshot);
          console.log("snapshot.val", snapshot.val());
          if (snapshot.val().allergies) {
            const uniqueKey = Object.keys(snapshot.val().allergies)[0];
            console.log(uniqueKey);
            setReadAllergyList(snapshot.val().allergies[uniqueKey]);
            setAllergies(snapshot.val().allergies[uniqueKey]);
          } else {
            console.log("New list created in database");
            writeNewAllergyList(userId);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("database list", readAllergyList);
  console.log("local list", allergies);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Allergies</Text>
        <Text style={styles.textBig}>
          What allergies would you like to add?
        </Text>
        <Text style={styles.text}>Please select all applicable allergies</Text>

        <View style={styles.row}>
          <Checkbox
            value={isCelerySelected}
            onValueChange={setIsCelerySelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Celery</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isCerealsSelected}
            onValueChange={setIsCerealsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Cereals containing gluten</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isCrustaceansSelected}
            onValueChange={setIsCrustaceansSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Crustaceans</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isEggsSelected}
            onValueChange={setIsEggsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Eggs</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isFishSelected}
            onValueChange={setIsFishSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Fish</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isLupinSelected}
            onValueChange={setIsLupinSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Lupin</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isMilkSelected}
            onValueChange={setIsMilkSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Milk</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isMolluscsSelected}
            onValueChange={setIsMolluscsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Molluscs</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isMustardSelected}
            onValueChange={setIsMustardSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Mustard</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isNutsSelected}
            onValueChange={setIsNutsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Nuts</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isPeanutsSelected}
            onValueChange={setIsPeanutsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Peanuts</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isSesameSeedsSelected}
            onValueChange={setIsSesameSeedsSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Sesame Seeds</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isSoyaSelected}
            onValueChange={setIsSoyaSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Soya</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            value={isSulphurDioxideSelected}
            onValueChange={setIsSulphurDioxideSelected}
            style={styles.checkbox}
          />
          <Text style={styles.AllergenText}>Sulphur Dioxide</Text>
        </View>

        <View>
          <Text style={styles.addAllergy}>Add Allergy</Text>
          <TextInput
            placeholder="Allergies..."
            style={styles.input}
            onChangeText={(textValue) => {
              return setNewAllergy(textValue);
            }}
            value={newAllergy}
          ></TextInput>
          <TouchableOpacity>
            <Button
              title="Add Allergy"
              onPress={() => {
                setNewAllergy("");
                setAllergies((prevAllergies) => {
                  return [...prevAllergies, newAllergy];
                });
              }}
            ></Button>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerSub}>Allergy List</Text>
          <FlatList
            scrollEnabled={false}
            data={readAllergyList}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  AllergenText: {
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 4,
    width: 220,
  },
  text: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  textSmall: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  textBig: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  addAllergy: {
    fontSize: 20,
    marginTop: 20,
    borderTopColor: "black",
  },
  headerSub: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
});

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { UserContext } from "../contexts/User";

export const AllergyList = ({ newAllergy }) => {
  const { userId } = useContext(UserContext);
  const [readAllergyList, setReadAllergyList] = useState([]);

  const readDatabase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/allergies`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //allergy Result is an array of [{allergy: XXX}]
          const allergiesResult = Object.values(snapshot.val());

          const allergyListDatabase = allergiesResult.map(
            (allergyResult) => allergyResult.allergy
          );
          setReadAllergyList(allergyListDatabase);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemove = (item) => {
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    get(child(dbRef, `users/${userId}/allergies`))
      .then((snapshot) => {
        const allergyList = snapshot.val();

        for (const allergen in allergyList) {
          get(child(dbRef, `users/${userId}/allergies/${allergen}`))
            .then((snapshot) => {
              const allergyInDatabase = snapshot.val();

              if (allergyInDatabase.allergy === item) {
                const key = allergen;
                remove(ref(db, `users/${userId}/allergies/${key}`));
              }
            })
            .catch((error) => {
              console.log(error);
            });
          const allergiesResult = Object.values(snapshot.val());

          const allergyListDatabase = allergiesResult.map(
            (allergyResult) => allergyResult.allergy
          );
          console.log("allergy list database", allergyListDatabase);
          if (allergyListDatabase) {
            setReadAllergyList(allergyListDatabase);
          } else {
            setReadAllergyList([]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    readDatabase();
  }, [readAllergyList, newAllergy]);

  return (
    <View>
      <Text style={styles.headerSub}>Allergy List</Text>
      <FlatList
        scrollEnabled={false}
        data={readAllergyList}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text>{item}</Text>
              <TouchableOpacity style={styles.remove}>
                <Button
                  title="Remove"
                  onPress={() => handleRemove(item)}
                ></Button>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerSub: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  remove: {
    marginLeft: 200,
    marginBottom: 10,
  },
});

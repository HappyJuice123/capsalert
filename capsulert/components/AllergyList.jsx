import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { UserContext } from "../contexts/User";

export const AllergyList = ({}) => {
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

  useEffect(() => {
    readDatabase();
  }, [readAllergyList]);

  return (
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
  );
};

const styles = StyleSheet.create({
  headerSub: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
});

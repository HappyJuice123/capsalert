import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
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
          const allergiesResult = Object.values(snapshot.val());

          const allergyListDatabase = allergiesResult.map(
            (allergyResult) => allergyResult.allergy
          );
          setReadAllergyList(allergyListDatabase);
        } else {
          setReadAllergyList([]);
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
          setReadAllergyList(allergyListDatabase);
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
      <Text className="text-center my-1 text-2xl text-greyBlack font-semibold">
        Allergy List
      </Text>
      <FlatList
        scrollEnabled={false}
        data={readAllergyList}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item}</Text>
              <TouchableOpacity>
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

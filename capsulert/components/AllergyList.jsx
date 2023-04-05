import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { UserContext } from "../contexts/User";
import { MaterialIcons } from "@expo/vector-icons";

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
    <ScrollView className="bg-whiteGrey">
      <View className="flex items-center">
        <Text className="text-center my-1 text-greyBlack font-semibold text-base ml-3">
          Other allergies
        </Text>
        <FlatList
          scrollEnabled={false}
          data={readAllergyList}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  className=" ml-1 bg-purpleLight rounded-xl mt-5 w-80 text-white 
                  border-black border-2"
                >
                  <Text className="text-white items-center pl-5 pt-2">
                    {item}
                  </Text>
                  <MaterialIcons
                    style={styles.icon}
                    name="delete-outline"
                    size={26}
                    color="black"
                    onPress={() => handleRemove(item)}
                  ></MaterialIcons>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-end",
    verticalAlign: "middle",
    padding: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
});

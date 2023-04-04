import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { UserContext } from "../contexts/User";
import {
  getDatabase,
  ref,
  child,
  push,
  set,
  get,
  remove,
} from "firebase/database";
import { AllergyList } from "./AllergyList";

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
  const [newAllergy, setNewAllergy] = useState("");

  const { userId } = useContext(UserContext);

  const handleInput = () => {
    const db = getDatabase();

    const postData = { allergy: newAllergy };
    const postListRef = ref(db, `users/${userId}/allergies`);
    const newPostRef = push(postListRef);
    set(newPostRef, postData);
    setNewAllergy("");
  };

  useEffect(() => {
    readCeleryCheckbox("Celery");
    readCerealsCheckbox("Cereals");
    readCrustaceansCheckbox("Crustaceans");
    readEggsCheckbox("Eggs");
    readFishCheckbox("Fish");
    readLupinCheckbox("Lupin");
    readMilkCheckbox("Milk");
    readMolluscsCheckbox("Molluscs");
    readMustardCheckbox("Mustard");
    readNutsCheckbox("Nuts");
    readPeanutsCheckbox("Peanuts");
    readSesameSeedsCheckbox("Sesame Seeds");
    readSulphurDioxideCheckbox("Sulphur Dioxide");
  }, [
    isCelerySelected,
    isCerealsSelected,
    isCrustaceansSelected,
    isEggsSelected,
    isFishSelected,
    isLupinSelected,
    isMilkSelected,
    isMolluscsSelected,
    isMustardSelected,
    isNutsSelected,
    isPeanutsSelected,
    isSesameSeedsSelected,
    isSoyaSelected,
    isSulphurDioxideSelected,
  ]);

  const handleCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const postListRef = ref(db, `users/${userId}/foodAllergies/${food}`);

          snapshot.val() ? set(postListRef, false) : set(postListRef, true);

          readCeleryCheckbox("Celery");
          readCerealsCheckbox("Cereals");
          readCrustaceansCheckbox("Crustaceans");
          readEggsCheckbox("Eggs");
          readFishCheckbox("Fish");
          readLupinCheckbox("Lupin");
          readMilkCheckbox("Milk");
          readMolluscsCheckbox("Molluscs");
          readMustardCheckbox("Mustard");
          readNutsCheckbox("Nuts");
          readPeanutsCheckbox("Peanuts");
          readSesameSeedsCheckbox("Sesame Seeds");
          readSoyaCheckbox("Soya");
          readSulphurDioxideCheckbox("Sulphur Dioxide");
        } else {
          const postListRef = ref(db, `users/${userId}/foodAllergies/${food}`);
          set(postListRef, true);

          food === "Celery" ? setIsCelerySelected(true) : null;
          food === "Cereals" ? setIsCerealsSelected(true) : null;
          food === "Crustaceans" ? setIsCrustaceansSelected(true) : null;
          food === "Eggs" ? setIsEggsSelected(true) : null;
          food === "Fish" ? setIsFishSelected(true) : null;
          food === "Lupin" ? setIsLupinSelected(true) : null;
          food === "Milk" ? setIsMilkSelected(true) : null;
          food === "Molluscs" ? setIsMolluscsSelected(true) : null;
          food === "Mustard" ? setIsMustardSelected(true) : null;
          food === "Nuts" ? setIsNutsSelected(true) : null;
          food === "Peanuts" ? setIsPeanutsSelected(true) : null;
          food === "Sesame Seeds" ? setIsSesameSeedsSelected(true) : null;
          food === "Soya" ? setIsSoyaSelected(true) : null;
          food === "Sulphur Dioxide" ? setIsSulphurDioxideSelected(true) : null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readCeleryCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsCelerySelected(foodCheckbox);
      }
    );
  };

  const readCerealsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsCerealsSelected(foodCheckbox);
      }
    );
  };

  const readCrustaceansCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsCrustaceansSelected(foodCheckbox);
      }
    );
  };

  const readEggsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsEggsSelected(foodCheckbox);
      }
    );
  };

  const readFishCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsFishSelected(foodCheckbox);
      }
    );
  };

  const readLupinCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsLupinSelected(foodCheckbox);
      }
    );
  };

  const readMilkCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsMilkSelected(foodCheckbox);
      }
    );
  };

  const readMolluscsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsMolluscsSelected(foodCheckbox);
      }
    );
  };

  const readMustardCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsMustardSelected(foodCheckbox);
      }
    );
  };

  const readNutsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsNutsSelected(foodCheckbox);
      }
    );
  };

  const readPeanutsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsPeanutsSelected(foodCheckbox);
      }
    );
  };

  const readSesameSeedsCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsSesameSeedsSelected(foodCheckbox);
      }
    );
  };

  const readSoyaCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsSoyaSelected(foodCheckbox);
      }
    );
  };

  const readSulphurDioxideCheckbox = (food) => {
    const db = getDatabase();

    get(child(ref(db), `users/${userId}/foodAllergies/${food}`)).then(
      (snapshot) => {
        const foodCheckbox = snapshot.val();
        setIsSulphurDioxideSelected(foodCheckbox);
      }
    );
  };

  return (
    <ScrollView>
      <View>
        {/* <Text className="text-center my-1 text-3xl text-greyBlack font-semibold">
          Allergies
        </Text> */}
        {/* <Text className="text-center my-1 mt-6 mb-3 text-2l text-greyBlack font-semibold">
          What allergies would you like to add?
        </Text> */}
        <Text className="text-center my-1 mt-6 mb-3 text-2l text-greyBlack font-semibold">
          Please select all applicable allergies
        </Text>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isCelerySelected}
            onValueChange={() => handleCheckbox("Celery")}
            input
            type="checkbox"
            className=" flex items-center justify-start peer relative appearance-none w-5 h-5 border rounded-sm focus:outline-none checked"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Celery
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isCerealsSelected}
            onValueChange={() => handleCheckbox("Cereals")}
            type="checkbox"
            className=" flex items-center justify-start peer relative appearance-none w-5 h-5 border rounded-sm focus:outline-none checked"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Cereals containing gluten
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isCrustaceansSelected}
            onValueChange={() => {
              handleCheckbox("Crustaceans");
            }}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Crustaceans
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isEggsSelected}
            onValueChange={() => {
              handleCheckbox("Eggs");
            }}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Eggs
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isFishSelected}
            onValueChange={() => {
              handleCheckbox("Fish");
            }}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Fish
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isLupinSelected}
            onValueChange={() => {
              handleCheckbox("Lupin");
            }}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Lupin
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isMilkSelected}
            onValueChange={() => handleCheckbox("Milk")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Milk
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isMolluscsSelected}
            onValueChange={() => handleCheckbox("Molluscs")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Molluscs
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isMustardSelected}
            onValueChange={() => handleCheckbox("Mustard")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Mustard
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isNutsSelected}
            onValueChange={() => handleCheckbox("Nuts")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Nuts
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isPeanutsSelected}
            onValueChange={() => handleCheckbox("Peanuts")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Peanuts
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isSesameSeedsSelected}
            onValueChange={() => handleCheckbox("Sesame Seeds")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Sesame Seeds
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isSoyaSelected}
            onValueChange={() => handleCheckbox("Soya")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Soya
          </Text>
        </View>

        <View className="flex flex-row ml-3">
          <Checkbox
            value={isSulphurDioxideSelected}
            onValueChange={() => handleCheckbox("Sulphur Dioxide")}
            type="checkbox"
          />
          <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
            Sulphur Dioxide
          </Text>
        </View>

        <View>
          {/* <Text className="text-left my-1 mt-6 mb-3 text-2l text-greyBlack font-semibold">
            Add Allergy
          </Text> */}
          <TextInput
            placeholder="Your allergies here..."
            className="mt-7 ml-3"
            //            style={styles.input}
            onChangeText={(textValue) => {
              return setNewAllergy(textValue);
            }}
            value={newAllergy}
          ></TextInput>

          <TouchableOpacity
            button
            onPress={handleInput}
            className="bg-purpleBG rounded-2xl mt-0 ml-3 w-24"
            title="Add "
          >
            <Text className="text-center my-2 text-white">add</Text>
          </TouchableOpacity>
        </View>

        <View>
          <AllergyList newAllergy={newAllergy} />
        </View>
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     padding: 30,
//   },
//   header: {
//     fontSize: 30,
//     paddingBottom: 20,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   checkbox: {
//     alignSelf: "center",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   AllergenText: {
//     marginLeft: 10,
//     marginBottom: 5,
//   },
//   input: {
//     borderColor: "#000",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginVertical: 10,
//     padding: 4,
//     width: 220,
//   },
//   text: {
//     fontSize: 15,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   textSmall: {
//     fontSize: 15,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   textBig: {
//     fontSize: 15,
//     marginTop: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   addAllergy: {
//     fontSize: 20,
//     marginTop: 20,
//     borderTopColor: "black",
//   },
//   headerSub: {
//     fontSize: 18,
//     marginTop: 10,
//     marginBottom: 10,
//   },
// });

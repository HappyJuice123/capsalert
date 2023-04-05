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
    <ScrollView className="bg-whiteGrey">
      <View>
        <Text className="text-center my-1 mt-6 mb-3 text-2l text-greyBlack font-semibold">
          Please select all applicable allergies
        </Text>

        <View className="mt-4">
          <View className="flex flex-row ml-3">
            <Checkbox
              value={isCelerySelected}
              onValueChange={() => {
                handleCheckbox("Celery");
              }}
              type="checkbox"
            />
            <Text className="my-1 ml-2 text-1l text-greyBlack font-semibold">
              Celery
            </Text>
          </View>

          <View className="flex flex-row ml-3">
            <Checkbox
              value={isCerealsSelected}
              onValueChange={() => {
                handleCheckbox("Cereals");
              }}
              type="checkbox"
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
              type="checkbox "
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
        </View>

        <View className="flex items-center mt-4">
          <TextInput
            placeholder="Add to your allergies ..."
            className="border-greyBlack border-2 rounded-xl w-60 mb-5 ml-2 p-2 text-center"
            onChangeText={(textValue) => {
              return setNewAllergy(textValue);
            }}
            value={newAllergy}
          ></TextInput>

          <TouchableOpacity
            button
            onPress={handleInput}
            className=" bg-purpleLight rounded-xl w-56 mb-5 flex items-center"
            title="Add "
          >
            <Text className="text-center my-2 text-white">Add</Text>
          </TouchableOpacity>
        </View>

        <View>
          <AllergyList newAllergy={newAllergy} />
        </View>
      </View>
    </ScrollView>
  );
};

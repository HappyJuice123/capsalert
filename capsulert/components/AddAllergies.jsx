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
import { getDatabase, ref, set, child, push } from "firebase/database";

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

  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [addNewAllergy, setAddnewAllergy] = useState("");

  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (isCelerySelected) {
      setAllergies((currentAllergies) => {
        return [...currentAllergies, newAllergy];
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
            data={allergies}
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

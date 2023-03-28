import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";

export const AddAllergies = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCelerySelected, setIsCelerySelected] = useState(false);
  const [isCerealsSelected, setIsCerealsSelected] = useState(false);
  const [isCurstaceansSelected, setIsCurstaceansSelected] = useState(false);
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

  const [newAllergy, setNewAllergy] = useState("Enter your allergies");

  const onChange = (textValue) => setNewAllergy(textValue);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Allergies</Text>
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
          value={isCurstaceansSelected}
          onValueChange={setIsCurstaceansSelected}
          style={styles.checkbox}
        />
        <Text style={styles.AllergenText}>Curstaceans</Text>
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
          onChangeText={onChange}
        ></TextInput>
        <TouchableOpacity onPress={() => addAllergy(newAllergy)}>
          <Button title="Add Allergy"></Button>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.header}>Allergy List</Text>
      </View>
    </View>
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
  addAllergy: {
    fontSize: 25,
    marginTop: 20,
    borderTopColor: "black",
  },
});

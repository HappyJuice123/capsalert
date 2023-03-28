import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
//add your component on press in the TouchableOpacity component
//eg <TouchableOpacity style={styles.button} onPress={<Allergies/>}>
const MyMedical = () => {
  return (
    <View>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.title}>Capsalert</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Medical History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>My Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Allergies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#ADD8E6",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    marginLeft: 50,
    marginRight: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 60,
    marginBottom: 40,
    textAlignVertical: "top",
    borderColor: "#ffc0cb",
  },

  welcome: {
    marginTop: 70,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
  buttons: {
    alignContent: "center",
  },
});
export default MyMedical;

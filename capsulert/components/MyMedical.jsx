import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
//add your component on press in the TouchableOpacity component
//eg <TouchableOpacity style={styles.button} onPress={<Allergies/>}>
import { useNavigation } from "@react-navigation/core";
import { auth } from "../App";

const MyMedical = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <ScrollView>
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

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    verticalAlign: "center",
  },
});

export default MyMedical;
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
} from "react-native";

import React, { useState, useEffect } from "react";

import { getMedication } from "../utils/api";

import * as Linking from "expo-linking";

import * as Speech from "expo-speech";

function AdditionalMedInfo({ route }) {
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const medicationName = route.params;

  useEffect(() => {
    setIsLoading(true);

    getMedication(medicationName)
      .then((responseData) => {
        console.log(responseData, "responseData, AddMedInfo");
        if (responseData === undefined) {
          setError(true);
        }
        setName(responseData.name);
        setDescriptions(responseData.hasPart);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const speakDescription = () => {
    options = { rate: 0.55 };
    const descriptionArr = descriptions.map(
      (description) => description.description
    );

    const readDescription = descriptionArr.join(" ");
    Speech.speak(readDescription, options);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading ? (
        <Text>Loading your medication details...</Text>
      ) : (
        <View style={styles.description}>
          <Text style={styles.header}>{name}</Text>
          <TouchableOpacity>
            <Button title="Speak" onPress={speakDescription}></Button>
          </TouchableOpacity>
          <Text>
            {descriptions.map((item) => {
              return item.description;
            })}
          </Text>
        </View>
      )}
      <View>
        <Text style={styles.extraInfo}>
          For further details please refer to the NHS website
        </Text>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() =>
            Linking.openURL(`https://www.nhs.uk/medicines/${name}`)
          }
        >
          {error ? (
            <Text>Error: Medication Not Recognised</Text>
          ) : (
            <Text>Click here to visit the NHS page for your medication</Text>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <Image
          style={styles.image}
          source={require("../assets/nhs_attribution_logo.png")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default AdditionalMedInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  header: {
    fontWeight: 900,
    paddingBottom: 10,
  },
  description: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  extraInfo: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: "contain",
  },
});

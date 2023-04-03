import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  FlatList,
  ScrollView,
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
  const [url, setUrl] = useState("");
  const [speaking, setSpeaking] = useState(false);

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
        const updatedUrl = responseData.url.replace("api.", "");
        setUrl(updatedUrl);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const speakDescription = () => {
    options = {
      rate: 0.6,
      onStart: () => setSpeaking(true),
      onStopped: () => setSpeaking(false),
      onDone: () => setSpeaking(false),
    };
    const descriptionArr = descriptions.map(
      (description) => description.description
    );

    const readDescription = descriptionArr.join(" ");
    if (!speaking) {
      Speech.speak(readDescription, options);
    } else {
      Speech.stop();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <Text>Loading your medication details...</Text>
        ) : (
          <View style={styles.description}>
            <Text style={styles.header}>{name}</Text>
            <TouchableOpacity onPress={speakDescription}>
              <Image
                style={styles.imageSpeech}
                source={require("../assets/speaking-icon.png")}
              />
            </TouchableOpacity>

            <FlatList
              scrollEnabled={false}
              data={descriptions}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text style={styles.text}>{item.description}</Text>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        )}
        <View>
          <Text style={styles.extraInfo}>
            For further details please refer to the NHS website
          </Text>
          <TouchableOpacity
            style={styles.buttonText}
            onPress={() => Linking.openURL(url)}
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
      </ScrollView>
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
    fontWeight: 500,
    paddingBottom: 10,
    marginTop: 20,
    fontSize: 20,
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
    width: 350,
    height: 200,
    resizeMode: "contain",
  },
  imageSpeech: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  text: {
    textAlign: "justify",
    marginBottom: 10,
  },
});

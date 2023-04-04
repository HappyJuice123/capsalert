import {
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

import React, { useState, useEffect } from "react";

import { getMedication } from "../utils/api";

import * as Linking from "expo-linking";

import * as Speech from "expo-speech";

function AdditionalMedInfo({ route }) {
  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");
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
        setErrName(medicationName);
        console.log(responseData, "responseData, AddMedInfo");
        if (responseData === undefined) {
          setError(true);
          setIsLoading(false);
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
    setSpeaking(true);
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

    Speech.speak(readDescription, options);
  };

  const stopSpeech = () => {
    setSpeaking(false);
    Speech.stop();
  };

  return error ? (
    <View className="bg-whiteGrey">
      <View className="bg-whiteGrey">
        <Text className="text-lg font-semibold my-5 mx-5">
          {errName ? errName[0].toUpperCase() + errName.slice(1) : errName}
        </Text>
        <Text className="text-justify mx-5 my-5">
          Error - Medication Not Recognised
        </Text>
      </View>

      <View className="items-center bg-whiteGrey ">
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.nhs.uk/medicines/")}
          className=" bg-purpleLight rounded-xl w-11/12"
        >
          <Text className="mx-5 text-center my-3  text-whiteGrey">
            Click here for a list of medicines from the NHS
          </Text>
        </TouchableOpacity>
      </View>
      <View className="items-center pb-80 bg-whiteGrey">
        <Image
          className="scale-50"
          source={require("../assets/nhs_attribution_logo.png")}
        />
      </View>
    </View>
  ) : (
    <KeyboardAvoidingView className="bg-whiteGrey">
      <ScrollView>
        {isLoading ? (
          <Text className="text-greyBlack">
            Loading your medication details...
          </Text>
        ) : (
          <View>
            <Text className="text-lg font-semibold mt-5 mx-5">{name}</Text>
            <TouchableOpacity
              onPress={!speaking ? speakDescription : stopSpeech}
            >
              <Image
                className="w-10 h-20 mx-6"
                source={require("../assets/speaking-icon.png")}
              />
            </TouchableOpacity>

            <FlatList
              scrollEnabled={false}
              data={descriptions}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text className="text-justify mx-5 mb-3 mt--1">
                      {item.description}
                    </Text>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        )}
        <View>
          <Text className="mx-5 text-justify mt-3 mb-5">
            For further details please refer to the NHS website.
          </Text>
          <View className="items-center">
            <TouchableOpacity
              className=" bg-purpleLight rounded-xl w-11/12 mb-5"
              onPress={() => Linking.openURL(url)}
            >
              <Text className="mx-5 text-center my-3 text-whiteGrey">
                Click here to visit the NHS page for your medication
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center pb-80">
          <Image
            className="scale-50"
            source={require("../assets/nhs_attribution_logo.png")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AdditionalMedInfo;

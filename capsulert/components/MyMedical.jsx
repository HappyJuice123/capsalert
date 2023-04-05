import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase/firebase";
import { UserContext } from "../contexts/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//add your component on press in the TouchableOpacity component
//eg <TouchableOpacity style={styles.button} onPress={<Allergies/>}>

const MyMedical = () => {
  const navigation = useNavigation();
  const { loggedInUser } = useContext(UserContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <ScrollView className="bg-whiteGrey">
      {/* <View className="bg-whiteGrey mt-6"> */}
      <View className="bg-whiteGrey mt-10">
        <Text className="text-center my-1 text-5xl text-greyBlack font-semibold">
          Capsalert
          <MaterialCommunityIcons name="pill" size={40} color="black" />
        </Text>
        <Text className="text-center my-5 text-greyBlack text-base">
          Welcome, {loggedInUser}!
        </Text>
        <View className="flex-1 items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Medical History");
            }}
            className="bg-purpleLight rounded-xl mt-10 w-56 mb-5"
          >
            <Text className="text-center my-2 text-white">Medical History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              {
                /* Navigate to the MyMedications route */
              }
              navigation.navigate("My Medications");
            }}
            className="bg-purpleLight rounded-xl my-5 w-56"
          >
            <Text className="text-center my-2 text-white">My Medications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Allergies");
            }}
            className="bg-purpleLight rounded-xl my-5 w-56"
          >
            <Text className="text-center my-2 text-white">Allergies</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              {
                /* Navigate to the Due Medications route */
              }
              navigation.navigate("DueMedications");
            }}
            className="bg-purpleLight rounded-xl my-5 w-56"
          >
            <Text
              // style={styles.text}
              className="text-center my-2 text-white"
            >
              Due Medications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-purpleBG rounded-2xl my-16 w-24"
          >
            <Text className="text-center my-2 text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyMedical;

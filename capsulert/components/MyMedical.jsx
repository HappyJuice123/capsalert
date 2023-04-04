import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase/firebase";
import { UserContext } from "../contexts/User";

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
      <View className="bg-whiteGrey mt-6">
        <Text className="text-center my-1 text-5xl text-greyBlack font-semibold">
          Capsalert
        </Text>
        <Text className="text-center my-5 text-greyBlack text-base">
          Welcome, {loggedInUser}!
        </Text>
        <View
          className="flex-1 items-center"
          // style={styles.buttons}
        >
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
              navigation.navigate("MyMedications");
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
            <Text
              // style={styles.buttonText}
              className="text-center my-2 text-white"
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     marginTop: 20,
//     marginBottom: 50,
//     backgroundColor: "#ADD8E6",
//     borderColor: "#000000",
//     borderWidth: 2,
//     borderRadius: 15,
//     paddingTop: 20,
//     paddingBottom: 20,
//     paddingLeft: 60,
//     paddingRight: 60,
//     marginLeft: 50,
//     marginRight: 50,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 60,
//     marginBottom: 40,
//     textAlignVertical: "top",
//     borderColor: "#ffc0cb",
//   },

//   welcome: {
//     marginTop: 70,
//     textAlign: "center",
//   },
//   text: {
//     textAlign: "center",
//     textAlignVertical: "center",
//     fontSize: 20,
//   },
//   buttons: {
//     alignContent: "center",
//     //  textAlignVertical: "center",
//   },
// });

export default MyMedical;

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
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
    <ScrollView className="bg-purpleBG">
      <Text className="my-10 mx-5 text-xl text-white">My Medical</Text>
      <Text className="text-center my-1 text-white">
        Welcome, {loggedInUser}!
      </Text>
      <Text className="text-center my-1 text-white">Capsalert</Text>
      <View
      // style={styles.buttons}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Medical History");
          }}
          className="bg-white"
        >
          <Text
            className="text-center my-5 mt-20"
            // style={styles.text}
          >
            Medical History
          </Text>
        </TouchableOpacity>
        {/* <Button
          title="Medical History"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-60 rounded-full items-center"
        /> */}

        <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            {
              /* Navigate to the MyMedications route */
            }
            navigation.navigate("MyMedications");
          }}
        >
          <Text
            // style={styles.text}
            className="text-center my-5"
          >
            My Medications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            navigation.navigate("Allergies");
          }}
        >
          <Text
            className="text-center my-5"
            // style={styles.text}
          >
            Allergies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            {
              /* Navigate to the Due Medications route */
            }
            navigation.navigate("DueMedications");
          }}
        >
          <Text
            // style={styles.text}
            className="text-center my-5"
          >
            Due Medications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          // style={styles.button}
        >
          <Text
            // style={styles.buttonText}
            className="text-center my-20"
          >
            Sign Out
          </Text>
        </TouchableOpacity>
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

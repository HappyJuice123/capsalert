import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../contexts/User";
import { getDatabase, ref, set } from "firebase/database";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const { setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("My Medical");
      }
    });

    return unsubscribe;
  }, []);

  const writeUserData = (userId) => {
    const db = getDatabase();
    const reference = ref(db, `users/${userId}`);

    set(reference, { uid: userId });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const uid = user.uid;
        writeUserData(uid);
        console.log("Registered with", user.email);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView className="flex-1 items-center bg-whiteGrey ">
      <View className="w-10/12 flex-1 items-center ">
        <Text className="text-center mt-20 mb-10 text-5xl text-greyBlack font-semibold">
          Capsalert
        </Text>
        <TextInput
          className="bg-white border-2 border-greyBlack rounded-xl w-60 mb-5 p-2 text-center items-center"
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setLoggedInUser(text);
          }}
        />
        <TextInput
          className="bg-white border-2 border-greyBlack rounded-xl w-60 mb-5 p-2 text-center items-center"
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          className="bg-white border-2 border-greyBlack rounded-xl w-60 mb-5 p-2 text-center items-center"
          placeholder="Email"
          value={registerEmail}
          onChangeText={(text) => setRegisterEmail(text)}
        />
        <TextInput
          className="bg-white border-2 border-greyBlack rounded-xl w-60 mb-5 p-2  text-center items-center"
          placeholder="Password"
          value={registerPassword}
          onChangeText={(text) => setRegisterPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-purpleLight rounded-xl w-56 my-5 mb-40"
          onPress={handleSignUp}
        >
          <Text className="text-center my-2 text-white">Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;

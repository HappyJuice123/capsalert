import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { UserContext } from "../contexts/User";

const SignInPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView className="items-center bg-whiteGrey pb-96">
      <View>
        <Text className="text-center mt-20 text-5xl text-greyBlack font-semibold">
          Capsalert
        </Text>

        <TextInput
          placeholder="Email"
          value={loginEmail}
          onChangeText={(text) => {
            setLoginEmail(text);
            setLoggedInUser(text);
          }}
          className="border-2 border-black rounded-xl w-60 mb-5 p-2 mt-16 text-center bg-white"
        />
        <TextInput
          placeholder="Password"
          value={loginPassword}
          onChangeText={(text) => setLoginPassword(text)}
          className="border-2 border-black rounded-xl w-60 mb-5 p-2 text-center bg-white"
          secureTextEntry
        />
      </View>
      <View className="pb-96 flex items-center">
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-purpleLight rounded-xl my-5 w-56"
        >
          <Text className="text-center my-2 text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Register")}
          className="rounded-xl w-56"
        >
          <Text className="text-center text-greyBlack">Register</Text>
        </TouchableOpacity>
        <Image
          className="w-40 h-60 mt-10 mx-auto"
          source={require("../assets/pills.png")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInPage;

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { initializeApp } from "firebase/app";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddAllergies } from "./AddAllergies";

const firebaseConfig = {
  apiKey: "AIzaSyDc6-4VudZ4SMt5dm2iS7CoTH8WN6nme0s",
  authDomain: "capsulert.firebaseapp.com",
  projectId: "capsulert",
  storageBucket: "capsulert.appspot.com",
  messagingSenderId: "775759460960",
  appId: "1:775759460960:web:3eb3a47391236e87616105",
  measurementId: "G-33TQPKC9KF",
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Add Allergies"
        onPress={() => navigation.navigate("Allergies")}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Allergies" component={AddAllergies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

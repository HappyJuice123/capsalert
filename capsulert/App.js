import MedicalHistory from "./components/MedicalHistory";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyMedications } from "./components/MyMedications";
import { AddMedication } from "./components/AddMedication";
import { EditMedication } from "./components/EditMedication";
import { AddAllergies } from "./components/AddAllergies";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import MyMedical from "./components/MyMedical";
import { UserProvider } from "./contexts/User";
import AdditionalMedInfo from "./components/AdditionalMedInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={SignInPage}
          ></Stack.Screen>
          <Stack.Screen name="Register" component={SignUpPage}></Stack.Screen>
          <Stack.Screen name="My Medical" component={MyMedical}></Stack.Screen>
          <Stack.Screen
            name="Medical History"
            component={MedicalHistory}
          ></Stack.Screen>
          <Stack.Screen
            name="MyMedications"
            component={MyMedications}
            options={{ title: "My Medications" }}
          />
          <Stack.Screen
            name="AddMedication"
            component={AddMedication}
            options={{ title: "Add Medication" }}
          />
          <Stack.Screen
            name="Edit Medication"
            component={EditMedication}
            options={{ title: "Edit Medication" }}
          />
          <Stack.Screen name="Allergies" component={AddAllergies} />
          <Stack.Screen
            name="AdditionalMedInfo"
            component={AdditionalMedInfo}
            options={{ title: "Additional Info" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
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

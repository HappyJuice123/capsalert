import MedicalHistory from "./components/MedicalHistory";
import { StatusBar } from "expo-status-bar";
//import { StyleSheet} from "react-native";
import { Text, View, Button, SafeAreaView } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyMedications } from "./components/MyMedications";
import { AddMedication } from "./components/AddMedication";
import { AddAllergies } from "./components/AddAllergies";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import MyMedical from "./components/MyMedical";
import { UserProvider } from "./contexts/User";
import AdditionalMedInfo from "./components/AdditionalMedInfo";

//import { TailwindProvider } from "tailwindcss";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView
    //   className="flex-1 items-center justify-center bg-white
    // "
    // >

    //   <View className="flex-1 items-center justify-center" />
    //    <Text className="text-slate-800">Styling just works! 🎉</Text>
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
          <Stack.Screen name="Allergies" component={AddAllergies} />
          <Stack.Screen
            name="AdditionalMedInfo"
            component={AdditionalMedInfo}
            options={{ title: "Additional Info" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import MedicalHistory from "./components/MedicalHistory";
import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyMedications } from "./components/MyMedications";
import { AddMedication } from "./components/AddMedication";
import { AddAllergies } from "./components/AddAllergies";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import MyMedical from "./components/MyMedical";
import { UserProvider } from "./contexts/User";
import { NotificationsProvider } from "./contexts/Notifications";
import { MedicationsProvider } from "./contexts/Medications";
import AdditionalMedInfo from "./components/AdditionalMedInfo";
import PushNotifications from "./components/PushNotifications";
import DueMedications from "./components/DueMedications";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");

const config = {
  screens: {
    DueMedications: "medications",
  },
};

export default function App() {
  const linking = {
    prefixes: [prefix],
    config,
  };

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse) {
      Linking.openURL(
        lastNotificationResponse.notification.request.content.data.url
      );
    }
  }, [lastNotificationResponse]);

  return (
    <UserProvider>
      <NotificationsProvider>
        <MedicationsProvider>
          <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}
          >
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={SignInPage}
              ></Stack.Screen>
              <Stack.Screen
                name="Register"
                component={SignUpPage}
              ></Stack.Screen>
              <Stack.Screen
                name="My Medical"
                component={MyMedical}
                options={{
                  headerStyle: {
                    backgroundColor: "#6c537a",
                  },
                  headerTintColor: "#ebebeb",
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Medical History"
                component={MedicalHistory}
              ></Stack.Screen>
              <Stack.Screen
                name="My Medications"
                component={MyMedications}
                options={{
                  headerStyle: {
                    backgroundColor: "#6c537a",
                  },
                  headerTintColor: "#ebebeb",
                }}
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
              <Stack.Screen
                name="Push Notifications"
                component={PushNotifications}
                options={{ title: "Push Notifications" }}
              />
              <Stack.Screen
                name="DueMedications"
                component={DueMedications}
                options={{ title: "DueMedications" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MedicationsProvider>
      </NotificationsProvider>
    </UserProvider>
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

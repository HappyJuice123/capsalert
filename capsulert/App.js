import { StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import MyMedical from "./components/MyMedical";

const Stack = createNativeStackNavigator();

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
export const auth = getAuth();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={SignInPage}
        ></Stack.Screen>
        <Stack.Screen name="Register" component={SignUpPage}></Stack.Screen>
        <Stack.Screen name="My Medical" component={MyMedical}></Stack.Screen>
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

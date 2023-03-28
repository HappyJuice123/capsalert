import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyMedications } from "./MyMedications";
import { AddMedsPlaceholder } from "./AddMedsPlaceholder";
import { MoreInfoPlaceholder } from "./MoreInfoPlaceholder";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import MyMedical from "./MyMedical";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="profile"
          component={MyMedications}
          options={{ title: "My Medications" }}
        />
        <Stack.Screen
          name="AddMeds"
          component={AddMedsPlaceholder}
          options={{ title: "Add Medications" }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfoPlaceholder}
          options={{ title: "More Info" }}
        />
        <Stack.Screen
          name="MyMedical"
          component={MyMedical}
          options={{ title: "MyMedical" }}
        />
        <StatusBar style="auto" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
//     <View>
//       <StatusBar style="auto" />
//       <MyMedical />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//});
//  StyleSheet, Text,style={styles.container}

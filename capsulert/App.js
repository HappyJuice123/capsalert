import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
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

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <MyMedical />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//});
//  StyleSheet, Text,style={styles.container}

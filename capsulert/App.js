import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyMedications } from "./components/MyMedications";
import { AddMedication } from "./components/AddMedication";
import { MoreInfoPlaceholder } from "./components/MoreInfoPlaceholder";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import MyMedical from "./components/MyMedical";
import { UserProvider } from "./contexts/User";

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
            name="profile"
            component={MyMedications}
            options={{ title: "My Medications" }}
          />
          <Stack.Screen
            name="AddMeds"
            component={AddMedication}
            options={{ title: "Add Medications" }}
          />
          <Stack.Screen
            name="MoreInfo"
            component={MoreInfoPlaceholder}
            options={{ title: "More Info" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

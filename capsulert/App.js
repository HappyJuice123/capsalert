import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
            name="AdditionalMedInfo"
            component={AdditionalMedInfo}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

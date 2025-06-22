import React from "react";
import { AppRegistry } from "react-native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "./assets/Colors/color";
import MainContainer from "./Navigation/MainContainer";
import OrderDetailsScreen from "./Navigation/Screens/OrderDetailsScreen";
import HomeScreen from "./Navigation/Screens/HomeScreen";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: "red",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainContainer} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent("SheCurity", () => App);

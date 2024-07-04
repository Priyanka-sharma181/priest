


import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import HomeScreen from "./src/viewupcomming-booking";
import LoginScreen from "./src/login.screen";
import { MenuProvider } from "react-native-popup-menu";


const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkLoginState = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        setInitialRoute("Home");
      }
      setIsLoading(false);
    };
    checkLoginState();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;

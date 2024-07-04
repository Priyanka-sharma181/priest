import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import bcrypt from "bcryptjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.get(
        "http://3.111.220.23:5000/api/Temaple/getAllPriest",
        { params: { userEmail: email } }
      );

      const user = response.data;
console.log(user)
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          await AsyncStorage.setItem("userId", user.userId.toString());
          navigation.navigate("Home", { userId: user.userId });
        } else {
          Alert.alert("Invalid credentials");
        }
      } else {
        Alert.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error logging in. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>*Enter temple code</Text>
      <TextInput
        style={styles.input}
        placeholder="*Enter Temple Code"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>*Enter temple Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={() => handleLogin(email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "black",
  },
  label: {
    marginBottom: 5,
    color: "black",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  forgetPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgetPasswordText: {
    color: "#007BFF",
  },
  button: {
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default LoginScreen;

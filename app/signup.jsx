import { React, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import styles from "../styling/styles";
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postCode, setPostCode] = useState("");
  const router = useRouter();

  const registerUser = async () => {
    if (!username || !password || !email || !postCode) {
      Alert.alert(
        "Registration failed",
        "Please enter a valid username and password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);
      router.push("/map");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      // Handle error
      Alert.alert("Registration failed", errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={email}
          placeholder={"Enter Email"}
          placeholderTextColor="#000"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={username}
          placeholder={"Enter Username"}
          placeholderTextColor="#000"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"none"}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={password}
          placeholder={"Enter Password"}
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={postCode}
          placeholder={"Enter Post code"}
          placeholderTextColor="#000"
          onChangeText={(text) => setPostCode(text)}
          autoCapitalize={"none"}
          maxLength={8}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? "yellow" : "lightgreen" },
          styles.button,
        ]}
        onPress={registerUser}
      >
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;

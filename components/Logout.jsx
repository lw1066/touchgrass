import React from "react";
import { Alert, Pressable, Text } from "react-native";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useRouter } from "expo-router";
import styles from "../styling/styles";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      Alert.alert(
        "Logout Successful",
        "You have been logged out successfully."
      );
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "yellow" : "lightgreen" },
        styles.button,
      ]}
      onPress={handleLogOut}
    >
      <Text style={styles.text}>Log out</Text>
    </Pressable>
  );
};

export default LogoutButton;

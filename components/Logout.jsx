import React from "react";
import { Alert, Pressable, Text , View} from "react-native";
import { signOut } from "firebase/auth";
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
    <View style = {{  position: 'absolute' , bottom : -2, left : -2.5, zIndex : 1}}>
 <Pressable 
    style={({ pressed }) => [
      { backgroundColor: pressed ? "yellow" : "lightgreen"  , width : "100%" },
      
      styles.logoutButton,
    ]}
    onPress={handleLogOut}
  >
    <Text style={styles.text  }>Log out</Text>
  </Pressable>

    </View>
   
  );
};

export default LogoutButton;

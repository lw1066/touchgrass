import React from "react";
import { Pressable, Image, View } from "react-native"; // Removed unnecessary imports
import { useRouter } from "expo-router";
import styles from "../styling/styles";

const ProfileButton = () => {
  const router = useRouter();

  const handleProfilePress = async () => {
    router.push("/signedin/profile");
  };

  return (
    <View style={{ position: "absolute", bottom: -2, right: -2.5, zIndex: 1 }}>
      <Pressable
        style={({ pressed }) => [
          { 
            backgroundColor: pressed ? "yellow" : "lightgreen", 
            width: 60, 
            height: 60,
            borderRadius: 30, 
            alignItems: "center",
            justifyContent: "center",
          },
          styles.logoutButton, 
        ]}
        onPress={handleProfilePress}
      >
        <Image 
          source={require("../assets/profile.png")} 
          style={{ width: 40, height: 40 }}
        />
      </Pressable>
    </View>
  );
};

export default ProfileButton;

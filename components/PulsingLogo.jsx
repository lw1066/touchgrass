import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import styles from "../styling/styles";

const PulsingLogo = ({ creatingUser }) => {
  const [pulseAnimation] = useState(new Animated.Value(1));

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnimation.stopAnimation();
  };

  useEffect(() => {
    if (creatingUser) {
      startPulseAnimation();
    } else {
      stopPulseAnimation();
    }

    // Cleanup function to stop the animation when component unmounts
    return () => stopPulseAnimation();
  }, [creatingUser]); // Re-run effect when creatingUser changes

  // Return the animated image
  return (
    <Animated.Image
      style={[
        styles.logo,
        {
          transform: [
            {
              scale: pulseAnimation.interpolate({
                inputRange: [1, 1.2],
                outputRange: [1, 1.2],
              }),
            },
          ],
        },
      ]}
      source={require("../assets/icon.png")}
    />
  );
};

export default PulsingLogo;

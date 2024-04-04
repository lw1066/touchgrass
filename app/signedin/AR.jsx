import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroAnimations,
  ViroARCamera,
} from "@viro-community/react-viro";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useScore } from "../../context/scoreContext";
import { useTrophy } from "../../context/trophyContext";
import { removeEntryByCoordinates } from "../../utils/deleteTrophy";

ViroMaterials.createMaterials({
  gold: {
    diffuseTexture: require("../../assets/ARObj/gold.jpg"),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    duration: 1000,
    properties: {
      rotateY: "+=90",
    },
  },
  moveUpFadeOut: {
    duration: 1000,
    properties: {
      positionY: "+=1",
      opacity: 100,
    },
  },
});
const TrophySceneAR = () => {
  const [showPoints, setShowPoints] = useState(false);
  const [showObject, setShowObject] = useState(true);
  const [pointsToAdd, setPointsToAdd] = useState(100)
  const { incrementScore } = useScore();
  const { trophy, setTrophy } = useTrophy();
  const router = useRouter();

  const handleObjectClick = () => {
    setShowObject(false);
    setShowPoints(true);
    setTimeout(() => setShowPoints(false), 2500);
    incrementScore(pointsToAdd);
    removeEntryByCoordinates(trophy);
    setTimeout(() => router.navigate("/signedin/map"), 3500);
  };

  return (
    <ViroARScene>
      {showObject && (
        <Viro3DObject
          source={require("../../assets/ARObj/star.obj")}
          highAccuracyEvents={true}
          position={[0, 0, -1]}
          scale={[0.02, 0.02, 0.02]}
          rotation={[-45, 50, 40]}
          type="OBJ"
          materials={["gold"]}
          animation={{ name: "rotate", loop: true, run: true }}
          onClick={handleObjectClick}
        />
      )}
      {showPoints && (
        <ViroARCamera>
          <ViroText
            text="+100"
            scale={[1, 1, 1]}
            position={[0.1, 0, -2]}
            style={{ color: "#FFD700" }}
          />
        </ViroARCamera>
      )}
    </ViroARScene>
  );
};

const AR = () => {
  return (
    <>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: TrophySceneAR,
        }}
        style={{ flex: 1 }}
      />
      {/* <View>
        <Pressable style={styles.button}>
          <Link href="/signedin/map">
            {" "}
            <Text>Map</Text>{" "}
          </Link>
        </Pressable>
      </View> */}
    </>
  );
};

var styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 10,
  },
});

export default AR;

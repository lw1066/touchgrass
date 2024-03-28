import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "expo-dev-client";
import { Link } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Map = () => {
  const [userLocation, setUserLocation] = useState();
  const [permissionStatus, setPermissionStatus] = useState();

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === "granted") {
      let currentLocation = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log("Please grant location permissions");
    }
  };

  // const showTrophyLocations = () => {
  //   return trophies.map((trophy, index) => {
  //     return(
  //       <Marker
  //         key={index}
  //         coordinate={trophy.location}
  //         title={trophy.title}
  //         description={trophy.description}
  //       />
  //     )
  //   })
  // };

  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <>
      <View style={styles.container}>
        {userLocation ? (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0017,
              longitudeDelta: 0.001,
            }}
          >
            <Marker coordinate={userLocation} />
          </MapView>
        ) : (
          <Text>
            Please grant location permissions{"\n"}
            {"\n"}Let's not wait for the grass to grow...
          </Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={() => console.log()}>
        <Link href="/AR">
          {" "}
          <Text>Camera</Text>{" "}
        </Link>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "blue",
  },
});

export default Map;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable , Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "expo-dev-client";
import { Link } from "expo-router";
import * as Location from "expo-location";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "../components/Logout";
const Map = () => {
  const [userLocation, setUserLocation] = useState();
  const [permissionStatus, setPermissionStatus] = useState();
  const [currentPlaces, setCurrentPlaces] = useState([]);
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const user = FIREBASE_AUTH.currentUser;
      // get uid for asyc storage key
      const uid = user ? user.uid : null;
      try {
        const jsonValue = await AsyncStorage.getItem(`cachedPlaces_${uid}`);
        const actualJsonValue = jsonValue ? JSON.parse(jsonValue) : null;
        if (!actualJsonValue) {
          const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
          for (const doc of querySnapshot.docs) {
            if (user.email === doc.data().email) {
              const places = doc.data().places;
              const copyOfPlaces = [...places];
              const newPlace1 = copyOfPlaces[randomIndex(copyOfPlaces.length)];
              const newPlace2 = copyOfPlaces[randomIndex(copyOfPlaces.length)];
              const newPlace3 = copyOfPlaces[randomIndex(copyOfPlaces.length)];
              // Save to AsyncStorage
              const jsonArr = [newPlace1, newPlace2, newPlace3];
              await AsyncStorage.setItem(
                `cachedPlaces_${uid}`,
                JSON.stringify(jsonArr)
              );
              setCurrentPlaces([...jsonArr]);
              break;
            }
          }
        } else {
          console.log("Retrieved places from AsyncStorage:", actualJsonValue);
          setCurrentPlaces([...actualJsonValue]);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchNearbyPlaces();
  }, []);
  const randomIndex = (max) => {
    return Math.floor(Math.random() * max);
  };
  const showPois = () => {
    return currentPlaces.map((place, index) => {
      return (
        <Marker
          title={place.name}
          key={index}
          coordinate={{
            latitude: place.coordinates[1],
            longitude: place.coordinates[0],
          }}
          image={require("../assets/pin.png")}
           style={{ width: 48, height: 48 }}
        />
      );
    });
  };
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === "granted") {
      let currentLocation = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log("Please grant location permission");
    }
  };
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
              latitudeDelta: 0.0035,
              longitudeDelta: 0.015,
            }}
          >
            {currentPlaces.length !== 0 ? showPois() : null}
            <Marker
              coordinate={userLocation}
             image={require("../assets/currentLocation.png")}           
              title="Your location"         
            />
              
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
      <LogoutButton />
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
  markers: {
    color: "blue"
  },
});
export default Map;
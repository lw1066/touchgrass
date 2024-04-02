import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable , FlatList } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "expo-dev-client";
import { Link } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'


const Map = () => {
  const [userLocation, setUserLocation] = useState();
  const [permissionStatus, setPermissionStatus] = useState();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  
  const [selected, setSelected] = useState("");

   console.log("select -->",selected);

  
  const data = [
      {key:'commercial.supermarket', value:'commercial.supermarket', disabled:false},
      {key:'catering.restaurant,catering.cafe', value:'catering.restaurant,catering.cafe', disabled:false},
  ]
 
 //console.log(userLocation);

  //console.log("this is nearbyPlaces",nearbyPlaces);

  const showPois = () => {
    return nearbyPlaces.map((place, index) => {
      return <Marker style={styles.markers} title={place.name} key={index} coordinate={place.location}   pinColor='green'/>
    });
  };

  const fetchNearbyPlaces = async (longitude , latitude, categories) => {
    const apiKey = '8c4b8ef0c8334c7fbd0782c94e1fe1aa'; 
    
    var fetch = require('node-fetch');
    var requestOptions = {
      method: 'GET',
    };
    
    fetch(`https://api.geoapify.com/v2/places?categories=${categories}&bias=proximity:${longitude},${latitude}&limit=3&apiKey=8c4b8ef0c8334c7fbd0782c94e1fe1aa`, requestOptions)
    .then(response => response.json())
      .then((results) => {
        const data = results;
       // console.log("api results", data);
       const placesData = data.features.map(feature => ({
        name: feature.properties.name,
        location: {
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0]
        }
      }));
      
      setNearbyPlaces(placesData);
      })
     
  };

  useEffect(() => {
    // const long = -1.6885046;
    // const lat = 53.8065151

    if (userLocation && selected) {
      const { latitude, longitude } = userLocation;
      fetchNearbyPlaces(longitude, latitude, selected);
    }
  }, [userLocation, selected]);

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
              latitudeDelta: 0.0035,
              longitudeDelta: 0.015,
            }}
          >
             {showPois()}
        
            <Marker coordinate={userLocation} title="Your location"/>
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

      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
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
  markers : {
    color: "blue"
  }
});

export default Map;

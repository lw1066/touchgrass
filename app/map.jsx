import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable  } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "expo-dev-client";
import { Link } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
import { FIREBASE_AUTH , FIREBASE_DB} from "../firebaseConfig";
import { doc, getDoc, query, where , getDocs, collection} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Map = () => {
  const [userLocation, setUserLocation] = useState();
  const [permissionStatus, setPermissionStatus] = useState();
  const [currentPlaces, setCurrentPlaces] = useState([]);
  
  // if (currentPlaces.length > 0) {
  //   console.log("current places : ",currentPlaces) 
  // }

  

  useEffect(() => {


    const randomIndex = () => {
      return Math.floor(Math.random() * 100);
    };

    const fetchNearbyPlaces = async () => {
      const user = FIREBASE_AUTH.currentUser;

      try {
        const jsonValue = await AsyncStorage.getItem('cachedPlaces');
        const actualjsonValue = jsonValue ? JSON.parse(jsonValue) : null;
        console.log("async stor",actualjsonValue);
        if (!jsonValue) {
          const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));

          querySnapshot.forEach((doc) => {
            if (user.email === doc.data().email) {
            const places = doc.data().places
    
            
            setCurrentPlaces(() => {
              const copyOfPlaces = [...places];
              const newPlace = copyOfPlaces[randomIndex()];
              const newPlace2 = copyOfPlaces[randomIndex()];
              const newPlace3 = copyOfPlaces[randomIndex()];
    
              console.log("random indexs : ",randomIndex());

              try {
                const jsonArr = [newPlace,newPlace2,newPlace3]
                const writeJson = JSON.stringify(jsonArr);
                
                AsyncStorage.setItem('cachedPlaces', writeJson);
        
             } catch (e) {
               // saving error
             }

              return [newPlace,newPlace2,newPlace3];

            });
            }
    
          });
          
          return
        }
        else {
          console.log("hello");
          setCurrentPlaces([actualjsonValue])
        }
      } catch (e) {
        // error reading value
      }

    };
    
    fetchNearbyPlaces();
   
    
  }, []);

  
const showPois = () => {
    // return nearbyPlaces.map((place, index) => {
    //   return <Marker style={styles.markers} title={place.name} key={index} coordinate={place.location}   pinColor='green'/>
    // });
    //
  return currentPlaces.map((place,index) => {
    return <Marker title={place.name} key={index}  coordinate={{
      latitude : place.coordinates[1], 
      longitude : place.coordinates[0]
    }}   pinColor='green'/>
  })
    
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
            
           {currentPlaces.length !== 0 ?   showPois()    : null}
        
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

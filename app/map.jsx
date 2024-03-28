import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text , Pressable } from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import 'expo-dev-client';
import { Link } from "expo-router";
import * as Location from 'expo-location'
import { useEffect, useState } from "react";

const Map = () => {
  const [userLocation, setUserLocation] = useState()

  const getPermissions = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      console.log("Please grant location permissions")
      return
    }

    let currentLocation = await Location.getCurrentPositionAsync({})
    setUserLocation(currentLocation)
    console.log(`Location: ${currentLocation}`)

  }

  useEffect(() => {
    getPermissions()
  }, [])
  return (
    <>
    
     <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
      </MapView>
      
    </View>
    <Pressable style={styles.button} onPress={() => console.log()}>
          <Link href="/AR">   <Text>Camera</Text> </Link>
        </Pressable>
    </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'

  },
  map: {
    width:'100%',
    height:'100%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    margin: 10,
   
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'blue',
  }
})

export default Map
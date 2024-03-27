import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import 'expo-dev-client';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
      </MapView>
      {/* <Text>Hello World</Text> */}
    </View>
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
  }
})

export default Map
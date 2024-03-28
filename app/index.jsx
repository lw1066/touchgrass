import { View } from "react-native";

import { Link } from "expo-router";
import Map from "../components/map";

export default function Page() {
  return (
    <>
      <Map />
      <View>
        <Link href="/AR">Camera</Link>
      </View>
    </>
  );
}

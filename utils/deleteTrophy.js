import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

// const user = FIREBASE_AUTH.currentUser;
// const uid = user ? user.uid : null;

const getCachedPlaces = async () => {
  const user = FIREBASE_AUTH.currentUser;
  const uid = user ? user.uid : null;

  try {
    const jsonValue = await AsyncStorage.getItem(`cachedPlaces_${uid}`);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

const removeEntryByCoordinates = async (coordinatesToRemove) => {
  const user = FIREBASE_AUTH.currentUser;
  const uid = user ? user.uid : null;
  try {
    const array = await getCachedPlaces();
    if (array) {
      const modifiedArray = array.filter((entry) => {
        return (
          +entry.coordinates[0] !== +coordinatesToRemove[0] ||
          +entry.coordinates[1] !== +coordinatesToRemove[1]
        );
      });
      await AsyncStorage.setItem(
        `cachedPlaces_${uid}`,
        JSON.stringify(modifiedArray)
      );
      console.log("Entry removed successfully");
    } else {
      console.log("Array not found in AsyncStorage");
    }
  } catch (error) {
    console.error("Error removing entry:", error);
  }
};

export { removeEntryByCoordinates };

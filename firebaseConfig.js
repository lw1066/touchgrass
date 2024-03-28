import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIjFhvRXvghNvGpm2kAu5810CUDR-7rb8",
  authDomain: "touchgrass-7ff00.firebaseapp.com",
  projectId: "touchgrass-7ff00",
  storageBucket: "touchgrass-7ff00.appspot.com",
  messagingSenderId: "680985667104",
  appId: "1:680985667104:web:a070d94911144b518bbe45",
  measurementId: "G-C2V3QX8ZMR",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

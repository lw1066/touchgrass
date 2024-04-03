// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, SafeAreaView } from "react-native";
// import { Accelerometer } from "expo-sensors";


// export default StepCounter = () => {
//   const [steps, setSteps] = useState(0);
//   const [isCounting, setIsCounting] = useState(false);
//   const [lastY, setLastY] = useState(0);
//   const [lastTimeStamp, setLastTimeStamp] = useState(0);
//   useEffect(() => {
//     let subscription;
//     Accelerometer.isAvailableAsync().then((result) => {
//       if (result) {
//         subscription = Accelerometer.addListener((accelerometerData) => {
//           const { y } = accelerometerData;
//           const threshold = 0.1;
//           const timeStamp = new Date().getTime();
//           if (
//             Math.abs(y - lastY) > threshold &&
//             !isCounting &&
//             timeStamp - lastTimeStamp > 800
//           ) {
//             setIsCounting(true);
//             setLastY(y);
//             setLastTimeStamp(timeStamp);
//             setSteps((prevSteps) => {
//               prevSteps + 1;
//             });
//             setTimeout(() => {
//               setIsCounting(false);
//             }, 1200);
//           }
//         });
//       } else {
//         console.log("Accelerometer is not available on this device");
//       }
//     });
//     return () => {
//       if (subscription) {
//         subscription.remove();
//       }
//     };
//   }, [isCounting, lastY, lastTimeStamp]);
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Step Tracker</Text>
//       <View style={styles.infoContainer}>
//         <View style={styles.stepsContainer}>
//           <Text style={styles.stepsText}>{steps}</Text>
//           <Text style={styles.stepsLabel}>Steps</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   infoContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   stepsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 20,
//   },
//   stepsText: {
//     fontSize: 36,
//     color: "#3498db",
//     fontWeight: "bold",
//     marginRight: 8,
//   },
//   stepsLabel: {
//     fontSize: 24,
//     color: "#555",
//   },
// });
import React, { useState, useEffect } from "react";
import { PermissionsAndroid, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import { useScore } from "../context/scoreContext";
// export default function PedometerScreen() {
  
  //   useEffect(() => {
    //     const requestPermission = async () => {
      //       try {
        //         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           const subscription = Pedometer.watchStepCount((result) => {
    //             setSteps(result.steps);
    //             console.log(steps);
    //             incrementScore(pointsToAdd);
    //           });
    //           return () => {
      //             subscription.remove();
      //           };
      //         }
      //       } catch (err) {
        //         console.log(err);
        //       }
        //     };
        //   }, []);
        //   return (
          //     <View>
          //       <Text>Total Steps: {steps}</Text>
          //     </View>
          //   );
          // }
          export default function App() {
            const [steps, setSteps] = useState(0);
            const [pointsToAdd, setPointsToAdd] = useState(1);
            const { incrementScore } = useScore();
            const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
            const [pastStepCount, setPastStepCount] = useState(0);
            const [currentStepCount, setCurrentStepCount] = useState(0);
            
            const subscribe = async () => {
              const isAvailable = await Pedometer.isAvailableAsync();
              setIsPedometerAvailable(String(isAvailable));
              
              if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
        console.log(result.steps)
        incrementScore(pointsToAdd)
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
}
import React, { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ScoreBoard = () => {
    const [score, setScore] = useState(10000)

    return (
        <View style={styles.container}>
            <Text style={styles.text} >Score</Text>
            <Text style={styles.text} >{score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        right : 15,
        paddingTop : 10,
        zIndex : 1 ,
        top: 50,
        position: 'absolute',
        justifyContent : "center",
        borderWidth : 1,
        borderColor: "green",
        borderRadius : 5,
        width : 50,
        height : 50,
        alignItems : "center",
        backgroundColor : "rgba(144,238,144,0.5)"
        
       // transform : [{translateX: -75}]
    },
    text: {
       fontSize : 10,
        color: "blue",
        top : -10
      }

})

export default ScoreBoard;

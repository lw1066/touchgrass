import {React ,useState} from 'react'
import { View, Text, TextInput , Pressable , StyleSheet , Image , Alert } from 'react-native'
import {Link , useRouter} from "expo-router"
import  styles  from "../styling/styles";

const SignUpScreen =() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [postCode, setPostCode] = useState("");
    const router = useRouter();

    const handleAccountCreation = () => {
        /**
         * 
         * check database if the username is not the same 
         * use jwt to create username and hash password
         * then use jwt to get the auth token back
         * set isloggedin to auth token 
         * 
         */
        setIsLoggedIn(true)
        
    }

    const registerUser = () => {
        if (!username || !password || email || postCode) {
            Alert.alert('Registration failed', 'Please enter a valid username and password', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            return 
         }
         //this will be refractored
         const simulateLogin = () => {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve("login successful")          
                  }, 3000)})
         }
         
        simulateLogin()
        .then((msg) => {
            console.log(msg);
            router.push("/map")
        })
        .catch((err) => {
            console.log("log in failed",err);
        })
        //this will be refractored
        
      }
  

  return (
    <View style={styles.container}>
      <Image 
            style={styles.logo}
            source={
               require("../assets/icon.png")
            }/>
    <Text style={styles.title}>Sign Up</Text>
    <View style={styles.inputView}>
    <TextInput  
     style={styles.inputText}
        value={email}
        placeholder={"Enter Email"}
        placeholderTextColor="#000" 
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={"none"}
      />
    </View>
    <View style={styles.inputView}>
    <TextInput  
     style={styles.inputText}
        value={username}
        placeholder={"Enter Username"}
        placeholderTextColor="#000" 
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
    </View>
    
    <View style={styles.inputView}>
    <TextInput
     style={styles.inputText}   
        value={password}
        placeholder={"Enter Password"}
        placeholderTextColor="#000" 
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
       </View>
       <View style={styles.inputView}>
    <TextInput  
     style={styles.inputText}
        value={postCode}
        placeholder={"Enter Post code"}
        placeholderTextColor="#000" 
        onChangeText={(text) => setPostCode(text)}
        autoCapitalize={"none"}
        maxLength={8}
      />
    </View>
      
       <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'yellow' : 'lightgreen' }, styles.button ]} onPress={registerUser}>
       <Text style={styles.text}>Sign up</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'yellow' : 'lightgreen' }, styles.button ]} onPress={() => router.back()}>
           <Text style={styles.text}>Back</Text> 
          </Pressable>
    </View>
  )
}


export default SignUpScreen

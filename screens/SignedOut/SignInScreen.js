import { createRef, forwardRef, useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Keyboard } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Image, Text, Input, Icon } from '@rneui/themed' 
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/index";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar'; 
import { Header, TextInput, Button } from "./components";
import supabase from '../../lib/supabaseConfig'

export default function SignInScreen({navigation}) {

  
  const { signIn, setActive, isLoaded } = useSignIn();
   
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  const emailValidation = () => {
    if(emailAddress ==""){
      setEmailErr("Email can't be blank!")
    }else if(!emailRegEx.test(emailAddress)){
      setEmailErr("Incorrect email format!")
    }else{
      setEmailErr("")
    }
  }


  const onSignInPress = async () => {
    setIsLoading(true)

    if (!isLoaded) {
      setIsLoading(false)
      return;
    } 

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId }); 
    } catch (err) {
      const error = JSON.stringify(err)
      // 
      alert(error);

      // password_incorrect
      // not_found
 
    }

    setIsLoading(false)
  };

  console.log(emailAddress, password, emailErr)

  return (
    <>
      {/* <StatusBar  /> */}
      <SafeAreaView>
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
          <View style={[styles.signedOutContainer, styles.bgYellow]}> 
            <Header title="Login" subtitle="Sign in to continue" />
            <View style={{rowGap: -10, marginTop: 30}}>
              <View> 
                <TextInput 
                  inputStyle={{borderBottomWidth: 0}}
                  style={styles.input}
                  value={emailAddress}
                  handleChange={(value) => {
                    setEmailAddress(value)
                    emailValidation()
                  }}
                  label="Email or Username"
                  labelStyle={styles.labelStyle}
                  errorStyle={emailErr && {marginBottom: 20}}
                  onBlur={emailValidation}
                  errorMessage={emailErr}
                  keyboardType="email-address"
                  placeholder="johndoe@example.com"
                  disabled={isLoading}
                /> 
              </View>
              <View> 
                <TextInput
                  inputStyle={styles.password}
                  label="Password"
                  labelStyle={styles.labelStyle} 
                  value={password}
                  handleChange={(value) => setPassword(value)}
                  placeholder="**********"
                  rightIcon={{type: 'material-community', name: `${showPass ? 'eye-off' : 'eye-outline'}`, onPress: () => setShowPass(prev => !prev) }}
                  secureText={showPass}
                  disabled={isLoading} 
                  containerStyle={{width: 300}}   
                  style={styles.passwordStyleInput}
                /> 
              </View>
              <View style={{alignSelf: 'center', rowGap: 20}}>
                <Button 
                  isLoading={isLoading} 
                  title="Log in"    
                  isError={!password || emailErr ? true : false} 
                  handleFunction={onSignInPress}   
                />
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                  <Text style={[styles.textCenter, styles.uppercase, {marginBottom: 5, color: '#524406'}]}>
                    Don't have an account yet? 
                  </Text>
                  <Text style={[styles.textCenter, styles.uppercase, {marginBottom: 5, color: '#524406'}]}>
                    Sign-Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );  
}

// const styles = StyleSheet.create({})

/* 
<SafeAreaView style={styles.container}> 
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>

        <View>
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity onPress={onSignInPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>
 
      </View>
    </SafeAreaView>
*/
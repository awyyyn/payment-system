import React, { useState } from "react";
import { Text, Input, Button as RNButton } from "@rneui/themed"
import { TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { StatusBar } from 'expo-status-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, TextInput, Button, VerifyDialog } from "./components"; 
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import supabase from "../../lib/supabaseConfig";

export default function SignUpScreen({navigation}) {
  const { isLoaded, signUp, setActive } = useSignUp();
   

  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  // const [emailAddress, setEmailAddress] = React.useState("");
  // const [password, setPassword] = React.useState(""); 
  const [code, setCode] = React.useState("");
  const [codeErr, setCodeErr] = React.useState(false);
  const [showPass, setShowPass] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    address: "",
  });
  const [formError, setFormError] = useState({
    firstName: "", 
    lastName: "",
    username: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    address: "",
  });
  const [isOpen, setIsOpen] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [verifying, setVerifying] = useState(); 

  const fNameValidation = () => { 
    if(formData.firstName == ""){
      setFormError((prev => ({...prev, firstName: "Required!"})))
    }else{
      setFormError((prev => ({...prev, firstName: ""})))
    }
  } 
  const lNameValidation = () => {
    if(formData.lastName == ""){
      setFormError((prev => ({...prev, lastName: "Required!"})))
    }else{
      setFormError((prev => ({...prev, lastName: ""})))
    }
  } 
  const cNumberValidaiton = (value) => {
    
    if(!formData.phoneNumber) {
      setFormError((prev => ({...prev, phoneNumber: "Required!"})))
    }else if(formData.phoneNumber.slice(0, 2) != "09" || value.length != 11 || !/^\d+$/.test(value) ){
      setFormError((prev => ({...prev, phoneNumber: "Invalid Phone Number!"})))
    }else {
      setFormError((prev => ({...prev, phoneNumber: ""})))
    }   
  } 
  const uNameValidation = () => {
    if(!formData.username){
      setFormError((prev => ({...prev, username: "Required"})))
    }else{
      setFormError((prev => ({...prev, username: ""})))
    }
  } 
  const emailValidation = () => {
    if(!formData.emailAddress){
      setFormError((prev => ({...prev, emailAddress: "Required!"})))
    }else if(!emailRegEx.test(formData.emailAddress)){ 
      setFormError((prev => ({...prev, emailAddress: "Incorrect Format!"})))
    }else{
      setFormError((prev => ({...prev, emailAddress: ""})))
    }
  } 
  const passValidation = () => {
    if(!formData.password){
      setFormError((prev => ({...prev, password: "Required"})))
    }else if(formData.password.length < 7){ 
      setFormError((prev => ({...prev, password: "Password must be at least 8 characters"})))
    }else{
      setFormError((prev => ({...prev, password: ""})));
    }
  } 
  const addressValidaiton = () => {
    if(!formData.address){
      setFormError((prev => ({...prev, address: "Required!"}))) 
    }else {
      setFormError((prev => ({...prev, address: ""})))
    }
    console.log(formError.address)
  }
  

  // start the sign up process.
  const handleSignUp = async () => {
    setIsLoading(true)
    let phoneNumber = `63${formData.phoneNumber.slice(1)}`
    console.log("CLICKED")

    if (!isLoaded) {
      setIsLoading(false)
      return;
    } 

    try {
      
      await signUp.create({
        emailAddress: formData.emailAddress,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        // username: formData.username,
        phoneNumber,  
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" }); 
      // change the UI to our pending section.
      setIsLoading(false);
      setPendingVerification(true);
    } catch (err) {
      
      console.error(JSON.stringify(err, null, 2)); 
      err.errors.map(errr => {
        if(errr.message.includes("email address is taken")){
          setFormError((prev) => ({...prev, emailAddress: errr.message}))
        }
        if(errr.message.includes("phone number is taken")){
          setFormError((prev) => ({...prev, phoneNumber: errr.message}))
        }
        if(errr.message.includes("Password has been found")){
          setFormError((prev) => ({...prev, password: errr.message}))
        }
        if(errr.message.includes("Too many request")){
          alert(errr.message)
        }
      })

      
      setIsLoading(false);
      // console.log(err.errors[0].message.includes[])
      // setFormError((prev) => ({...prev, password: "Password has been found in an online data breach"}))
    }
  };
 
  const handleVerification = async() => {
    setVerifying(true);
    if (!isLoaded) {
      setVerifying(false);
      return;
    } 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });  
      await supabase.from("clients_table").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        middle_name: formData.middleName,
        address: formData.address,
        email: formData.emailAddress, 
        contact: formData.phoneNumber
      })
      setVerifying(false);
    } catch (err) {
      setCodeErr(String(err.errors[0].longMessage));
      console.error(JSON.stringify(err, null, 2)); 
      setVerifying(false);
    }
  }
 
  const isButtonDisabled = formError.address || formError.emailAddress || formError.firstName || formError.lastName || formError.password || formError.phoneNumber || !formData.password ? true : false

  return (
    <> 
      <SafeAreaView >
        <ScrollView contentContainerStyle={[{paddingVertical: 75}]}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.signedOutContainer]}>

              {!pendingVerification ?
                <>
                  <Header title="Create new Account" subtitle="Sign up here" style={styles.createAccount} />
                  <View style={{rowGap: -10, marginTop: 20, minWidth: 280}}>
                    <View style={{rowGap: -15}}>
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="First Name"
                        onBlur={fNameValidation}
                        value={formData.firstName}
                        labelStyle={styles.labelStyle}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, firstName: value}))
                          fNameValidation()
                        }}
                        errorMessage={formError.firstName}
                        errorStyle={formError.firstName && {marginBottom: 20}}
                        placeholder="John"
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Middle Name (Optional)"
                        value={formData.middleName}
                        labelStyle={styles.labelStyle} 
                        handleChange={(value) => setFormData((data) => ({...data, middleName: value}))}
                        placeholder="Smith"
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Last Name"
                        value={formData.lastName}
                        labelStyle={styles.labelStyle}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, lastName: value}));
                          lNameValidation()
                        }}
                        placeholder="Doe"
                        onBlur={lNameValidation}
                        errorMessage={formError.lastName}
                        errorStyle={formError.lastName && {marginBottom: 20}}
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Contact Number"
                        value={formData.phoneNumber}
                        labelStyle={styles.labelStyle}
                        keyboardType="decimal-pad"
                        onBlur={() => cNumberValidaiton(formData.phoneNumber)}
                        errorMessage={formError.phoneNumber}
                        errorStyle={formError.phoneNumber && {marginBottom: 20}} 
                        handleChange={(value) => {
                          setFormData((data) => ({...data, phoneNumber: value})); 
                          cNumberValidaiton(value)
                        }}
                        placeholder="09876543210"
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      <TextInput
                        disabled={isLoading}  
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Address"
                        errorMessage={formError.address}
                        errorStyle={formError.address && {marginBottom: 20}}
                        onBlur={addressValidaiton}
                        value={formData.address}
                        labelStyle={styles.labelStyle}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, address: value}))
                          addressValidaiton()
                        }}
                        placeholder=""
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      {/* <TextInput 
                        disabled={isLoading} 
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Username"
                        value={formData.username}
                        labelStyle={styles.labelStyle}
                        errorMessage={formError.username}
                        errorStyle={formError.username && {marginBottom: 20}}
                        onBlur={uNameValidation}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, username: value}))
                          uNameValidation()
                        }}
                        placeholder="09876543210"
                        // errorStyle={emailErr && {marginBottom: 20}}
                      /> */}
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={{borderBottomWidth: 0}}
                        style={styles.input}
                        label="Email"
                        value={formData.emailAddress}
                        labelStyle={styles.labelStyle}
                        onBlur={emailValidation}
                        keyboardType="email-address"
                        errorMessage={formError.emailAddress}
                        errorStyle={formError.emailAddress && {marginBottom: 20}}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, emailAddress: value}))
                          emailValidation()
                        }}
                        placeholder="johndoe@gmail.com"
                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                      <TextInput  
                        disabled={isLoading}
                        inputStyle={styles.password}
                        containerStyle={{width: 300}}   
                        style={styles.passwordStyleInput} 
                        label="Password"
                        errorMessage={formError.password} 
                        errorStyle={formError.password && {marginBottom: 20}}
                        value={formData.password}
                        onBlur={passValidation}
                        secureText={showPass}  
                        labelStyle={styles.labelStyle}
                        handleChange={(value) => {
                          setFormData((data) => ({...data, password: value}));
                          passValidation()
                        }}
                        placeholder=""
                        rightIcon={{type: 'material-community', name: `${showPass ? 'eye-off' : 'eye-outline'}`, onPress: () => setShowPass(prev => !prev) }}

                        // errorStyle={emailErr && {marginBottom: 20}}
                      />
                    </View>
                    <View style={{alignSelf: 'center', rowGap: 20}}> 
                      <Button 
                        isLoading={isLoading} 
                        title="Sign Up"
                        isError={isButtonDisabled}
                        handleFunction={handleSignUp}     
                      />
                      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                        <Text style={styles.link}>
                          Already have an account? Sign in 
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
                :
                <>
                <Header />
                  <Text style={[styles.textCenter, {fontSize: 25, marginTop: 20}]}>
                    Verify Sign Up
                  </Text>
                  <Text style={[styles.textCenter, {color: 'gray'}]}>
                    Enter the verification code
                  </Text>
                  <View style={{alignItems: 'center'}}> 
                    <Text style={[styles.textCenter, {marginBottom: 20}]}>
                        to complete sign up.
                    </Text>
                    <Input  
                      maxLength={6}
                      keyboardType='decimal-pad'
                      inputStyle={{letterSpacing: 23, textAlign: 'center'}}
                      value={code}
                      containerStyle={{minWidth: 250}}
                      onChangeText={(value) => setCode(value) }
                      errorMessage={codeErr}
                      errorStyle={codeErr && {marginBottom: 20}}
                    />
                    <RNButton
                      title="Verify Code"
                      containerStyle={{maxWidth: 230, minWidth: 230}}
                      color="#f1c91b" 
                      titleStyle={{color: '#2e5814'}}
                      raised
                      onPress={handleVerification}
                      loading={verifying}
                      disabled={!code}
                    />
                  </View> 
                </>
              }
            </View>
          </TouchableWithoutFeedback>
        </ScrollView> 
      </SafeAreaView>
    </>
  );
}

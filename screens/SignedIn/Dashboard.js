 
import { useAuth, useClerk, useSession, useUser, withUser  } from '@clerk/clerk-expo'; 
import { Text } from '@rneui/themed';
import { Dimensions, StyleSheet, View, Image,   } from 'react-native'; 
import styles from '../styles' 
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/ProviderContext';
import supabase from '../../lib/supabaseConfig';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons'
 


export default function Dashboard ({navigation}){
  const { user: userData, setUser }  = useContext(UserContext)
  const { isLoaded, actor, sessionId, userId, signOut } = useAuth() 
  const user = useUser(); 
  
  useEffect(() => {
    const setDataInContext = async() => {

      const { data, error } = await supabase.from("clients_table")
        .select().eq('email', `${user?.user?.emailAddresses[0]?.emailAddress}`).single()
 
      console.log(data)
 

      setUser((prev) => ({
        ...prev, 
        id: data?.uuid,
        email: data?.email,
        firstName: data?.first_name,
        lastName: data?.last_name,
        middleName: data?.middle_name,
        phoneNumber: data?.contact,
        address: data?.address,
        imageUrl: user?.user.imageUrl,
        created_at: data?.created_at
      }))
    }
    setDataInContext()
 
  }, []);
 
 
  if(!isLoaded) return <Text>LOADING...</Text>
   
  return (  
    <ScrollView style={{ backgroundColor: '#395326', position: 'relative'}} contentContainerStyle={{position: 'relative', paddingBottom: 50}}>
      <StatusBar backgroundColor='#ffde59' /> 
      <View style={inline.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={{height: 180, width: 180}} />
      </View>   
      <View 
        style={{
          position: 'relative',
          minHeight: 400,
          marginTop: 10,
          paddingHorizontal: 30
        }}
      >
        <Image 
          source={require('../../assets/dots.png')}
          style={{
            position: 'absolute',
            top: -100,
            maxHeight: 100,
            maxWidth: 200,
            right: 0
          }}
        />
        <Image 
          source={require('../../assets/dots.png')}
          style={{
            position: 'absolute',
            top: -100,
            maxHeight: 100,
            maxWidth: 200,
            left: 0
          }}
        />
        <Image 
          source={require('../../assets/dots.png')}
          style={{
            position: 'absolute',
            bottom: '30%',
            maxHeight: 150,
            maxWidth: 220,
            left: -50,
            opacity: 0.3
          }}
        />
        <Image 
          source={require('../../assets/arrows.png')}
          style={{height: 100, width: 35, objectFit: 'fill', zIndex: 99, position: 'absolute', left: 10,  top: 80, opacity: 0.4}}
        />  
        <Image 
          source={require('../../assets/arrows.png')}
          style={{height: 100, width: 35, objectFit: 'fill', zIndex: 99, position: 'absolute', right: 10,  bottom: 10, opacity: 0.4, transform: [{rotate: '180deg'}]}}
        />  
        <View>
          <Text h2 style={{color: '#c3aa4d'}}>Mission</Text>
          <Text style={{color: "#FFFFFF", lineHeight: 30, textAlign: 'justify'}}>
            WE ARE BOUND TO HELP THE EMPLOYEES AND CUSTOMERS TO UPLIFT THEIR ECONOMIC STATUS. TO SERVE AS AN EYE OPENER TO BOTH EMPLOYEES AND CUSTOMERS ON HOW TO BE RESPONSIBLE. TO PRODUCE A TRUSTWORTHY, DISCIPLINED AND GOAL ORIENTED INDIVIDUAL WHO WILL BE A FUTURE LEADER THAT WILL CREATE OPPORTUNITY TO OTHERS.
          </Text>
        </View>
      
        <View>
          <Text h2 style={{color: '#c3aa4d'}}>Vision</Text>
          <Text style={{color: "#FFFFFF", lineHeight: 30, textAlign: 'justify'}}>
          TO BE ONE OF THE BEST AND LEADING COMPANY THAT FOCUSES ON THE WELFARE OF THE EMPLOYEES, CUSTOMERS AND COMMUNITY BY NURTURING THEN ON HOW TO BE A RESPONSIBLE INDIVIDUAL NOT JUST FOR THEMSELVES BUT ALSO TO OTHERS.
          </Text>
        </View>

        <View style={{marginTop: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
          <Ionicons name='location-sharp' size={35} color='#c3aa4d' />
          <View style={{alignItems: "center"}}>
            <Text style={{color: '#FFFFFF'}}>P7 Lourdes St. Tinago,</Text>
            <Text style={{color: '#FFFFFF'}}>4504 Ligao - Philippines</Text>
          </View>
        </View>
        <View style={{paddingVertical:4, paddingHorizontal: 9, borderRadius: 20, backgroundColor: '#c3aa4d', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 20}}>
          <Text>09057128928</Text>
          <Text>bicolamigos@gmail.com</Text>
        </View>
        <Image 
          source={require('../../assets/dots.png')}
          style={{
            position: 'absolute',
            bottom: -160,
            maxHeight: 150,
            maxWidth: 220,
            alignSelf: 'center',
            opacity: 0.3
          }}
        />
      </View>
    </ScrollView>
  )
}
  


const inline = StyleSheet.create({
  container: {
    position: 'relative',
    width: Dimensions.get('window').width, 
  }, 
  logoContainer: {
    zIndex: 99,
    height: 200,
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width,
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center'
  }
})
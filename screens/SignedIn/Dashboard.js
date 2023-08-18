 
import { useAuth, useClerk, useSession, useUser, withUser  } from '@clerk/clerk-expo'; 
import { Text } from '@rneui/themed';
import { View,  } from 'react-native'; 
import styles from '../styles' 
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/ProviderContext';
import supabase from '../../lib/supabaseConfig';

 


function Dashboard ({navigation}){
  const { user: userData, setUser }  = useContext(UserContext)
  const { isLoaded, actor, sessionId, userId, signOut } = useAuth() 
  const user = useUser(); 
  
  useEffect(() => {
    const setDataInContext = async() => {

      const { data } = await supabase.from("clients_table")
        .select().eq('email', `${user.user.emailAddresses[0].emailAddress}`).single()
 

      setUser((prev) => ({
        ...prev,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phoneNumber: data.contact,
        address: data.address,
        imageUrl: user.user.imageUrl,
      }))
    }
    setDataInContext()

    console.log("HELLO WORLD")
    

  }, [])

 

  if(!isLoaded) return <Text>LOADING...</Text>
   
  return (  
    <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
      <View style={styles.mission}>
        <Text style={[ styles.minWidth, styles.title]}> Mission</Text>
        <Text style={[styles.uppercase, styles.paragraph]}> 
          We are bound to help the employees and customers to uplift their economic status.
        </Text>
        <Text style={[styles.uppercase, styles.paragraph]}> 
          To serve as an eye opener to both employees and customers on how to be responsible.
        </Text>
        <Text style={[styles.uppercase, styles.paragraph]}> 
        To produce a trustworthy, disciplined and goal oriented individual who will be a future leader that will create opportunity to others.
        </Text>
      </View>
      <View style={[styles.mission, { marginTop: 30}]}>

      <Text style={[ styles.minWidth, styles.title]}> Vision</Text>
        <Text style={[styles.uppercase, styles.paragraph]}> 
          To be one of the best and leading company that focuses on the welfare of the employees, customers and community by nurturing then on how to be a responsible individual not just for themselves but also to others.
        </Text> 
      </View>
    </ScrollView>
  )
}
 
export default Dashboard
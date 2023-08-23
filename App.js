
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { ClerkLoaded, ClerkLoading, ClerkProvider, SignedIn, SignedOut, signOut } from "@clerk/clerk-expo";
import SignInScreen from "./screens/SignedOut/SignInScreen";
import SignUpScreen from "./screens/SignedOut/SignUpScreen";
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/SignedIn/Dashboard';
import Inbox from './screens/SignedIn/Inbox';
import Context, { UserContext } from './contexts/ProviderContext' 
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonGroup, Dialog, Image } from "@rneui/themed";
import styles from "./screens/styles";
import Profile from "./screens/SignedIn/Profile";
import Payment from "./screens/SignedIn/Payment";
import Balance from "./screens/SignedIn/Balance";
import Logout from "./screens/SignedIn/Logout";
import { LoadingSpinner } from "./screens/SignedIn/components";
import { Skeleton } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); 


const tokenCache = { 
  async getToken(key) { 
    try { 
      return SecureStore.getItemAsync(key); 
    } catch (err) { 
      return null; 
    }  
  }, 
  async saveToken(key, value) { 
    try { 
      return SecureStore.setItemAsync(key, value); 
    } catch (err) { 
      return; 
    } 
  }, 
};
 




export default function App() { 

  const CLERK_PUBLISHABLE_KEY = "pk_test_d2FudGVkLXN3aW5lLTIwLmNsZXJrLmFjY291bnRzLmRldiQ"
 

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >  
      <Context>
        <NavigationContainer>
          <ClerkLoading>
            <View style={styles.loadingUI}> 
              <LoadingSpinner />
            </View>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>   
              <DrawerNavigation />
            </SignedIn>
            <SignedOut>
              <Stack.Navigator
                initialRouteName="SignIn"  
                screenOptions={{
                  presentation: 'card' 
                }}
              >
                <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
              </Stack.Navigator>
            </SignedOut>  
          </ClerkLoaded>
        </NavigationContainer>
      </Context>
    </ClerkProvider>
  );
}
 
const DrawerNavigation = () => { 

  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);  

  return (
    <Drawer.Navigator initialRouteName="Home" 
      detachInactiveScreens
      screenOptions={{
        drawerType: "front",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ffde59'
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
              source={{uri: user.imageUrl ? user.imageUrl : 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-white-blue-png-image_3918443.jpg'  }}  
              style={{height: 35, width: 35, borderRadius: 100, marginRight: 10}}  
            />
          </TouchableOpacity>
        ), 
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} title="Dashboard" />
      <Drawer.Screen name="Inbox" component={Inbox} title="Inbox" />
      <Drawer.Screen name="Profile" component={Profile} title="Profile" />
      <Drawer.Screen name="Payment Record" component={Payment} title="Payment Record" />
      <Drawer.Screen name="Principal" component={Balance} title="Principal" />
      <Drawer.Screen 
        name="Logout" 
        component={Logout} 
        title="Logout" 
        options={{
          headerShown: false
        }} 
      />
    </Drawer.Navigator>
  )
}
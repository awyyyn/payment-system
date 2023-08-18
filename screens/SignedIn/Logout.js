import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import styles from '../styles'

export default function Logout() {

    const { signOut } = useAuth()
 
    useEffect(() => {

        setTimeout(() => {
            signOut();
        }, 1000)

    }, [])
    

    return (
        <View style={styles.loadingUI}>
            <Text>Logging out.</Text>
        </View>
    )
}
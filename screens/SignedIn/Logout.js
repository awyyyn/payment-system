import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import styles from '../styles'
import LoadingUI from './components/LoadingUI'

export default function Logout() {

    const { signOut } = useAuth()
  
    setTimeout(() => {
        signOut();
    }, 1000)  
    

    return (
        <LoadingUI />
    )
}
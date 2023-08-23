import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../../styles'

export default function LoadingUI({customStyle, styless}) {
    return ( 
        <View style={customStyle == true ? styless : styles.loadingUI}>
            <ActivityIndicator size={100} color="#f1c91b" />
        </View>  
    )
}
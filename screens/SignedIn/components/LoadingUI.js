import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../../styles'

export default function LoadingUI() {
    return (
        <SafeAreaView>
            <View style={styles.loadingUI}>
                <ActivityIndicator size={100} color="#f1c91b" />
            </View>
        </SafeAreaView>
    )
}
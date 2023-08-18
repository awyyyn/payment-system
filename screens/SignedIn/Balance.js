import { View, ScrollView } from 'react-native'
import React from 'react'
import styles from '../styles'
import { Text } from '@rneui/themed'
import { TableRow } from './components'

export default function Balance() {
    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <View style={styles.payment}>
                <View style={styles.between}>
                    <Text>
                        Amount Loan: 
                    </Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.tableHeaderText}>Date of Payment</Text>
                        </View>
                        <View style={[styles.cell, styles.borderLeft]}>
                            <Text style={styles.tableHeaderText}>Amount</Text>
                        </View>
                        <View style={[styles.cell, styles.borderLeft]}>
                            <Text style={styles.tableHeaderText}>Status</Text>
                        </View>
                    </View>  
                </View>
            </View>
        </ScrollView>
    )
}
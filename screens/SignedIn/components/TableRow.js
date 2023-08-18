import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../styles'

export default function TableRow({
    date,
    amount,
    status
}) {
 

    return (
        <View style={[styles.row, styles.borderTop]}>
            <View style={styles.cell}>
                <Text style={styles.tableText}>
                    {date}
                </Text>
            </View>
            <View style={[styles.cell, styles.borderLeft]}>
                <Text style={styles.tableText}>
                    {amount}
                </Text>
            </View>
            <View style={[styles.cell, styles.borderLeft]}>
                <Text style={styles.tableText}>
                    {status}
                </Text>
            </View>
        </View> 
    )
}
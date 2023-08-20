import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { Skeleton, Text } from '@rneui/themed'
import { TableRow } from './components'
import supabase from '../../lib/supabaseConfig'
import { useAuth, useUser } from '@clerk/clerk-expo'

export default function Payment() {

    const { user } = useUser();
    const email = user.emailAddresses[0].emailAddress 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loan, setLoan] = useState("")

    useEffect(() => {
        async function getPaymentRecord() {
            const { data, error } = await supabase.from('clients_table').select(`payments_table(*), loans_table(*)`).eq('email', email).single()
            if(error) return alert(error)
            setData(data.payments_table)
            setLoan(data?.loans_table[0]?.amount_loan)
            setLoading(false) 
        }
        getPaymentRecord();
    }, []) 
 

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <View style={styles.payment}>
                <View style={styles.between}>
                    {loading ? <Skeleton animation='pulse' height={40} /> :
                        <Text style={{fontSize: 16}}>
                            Amount Loan: <Text style={{fontWeight: '900'}}>₱ {loan}</Text>
                        </Text>
                    }
                </View>
                {
                    loading ? 
                        <>
                            <Skeleton animation='pulse' style={{marginTop: 10}} height={500}  />
                        </>
                    :
                    <View style={styles.table}>
                        <View style={[styles.row, loading && styles.borderBottom]}>
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
                        { 
                            data.map(record => ( 
                                <View style={[styles.row, styles.borderTop]} key={record.id}>
                                    <View style={styles.cell}>
                                        <Text style={styles.recordText}>{new Date(record.created_at).toLocaleDateString()}</Text>
                                    </View>
                                    <View style={[styles.cell, styles.borderLeft]}>
                                        <Text style={styles.recordText}>₱ {record.amount}</Text>
                                    </View>
                                    <View style={[styles.cell, styles.borderLeft]}>
                                        <Text style={styles.recordText}>Paid</Text>
                                    </View>
                                </View> 
                            ))
                        }
                    </View>
                }
            </View>
        </ScrollView>
    )
}
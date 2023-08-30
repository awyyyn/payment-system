import { View, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../styles'
import { Image, Skeleton, Text } from '@rneui/themed' 
import supabase from '../../lib/supabaseConfig'
import { useAuth, useUser } from '@clerk/clerk-expo' 
import Table, { Section, BioCell, StaticCell, TouchableCell } from 'react-native-js-tableview';
import LoadingUI from './components/LoadingUI';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native-gesture-handler'
    


export default function Balance() {
 
    const { user } = useUser();
    const email = user.emailAddresses[0].emailAddress 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loan, setLoan] = useState("");
    const [balance, setBalance] = useState(0);
 
    const getPaymentRecord = useCallback(async () =>  {
        setLoading(true) 
        const { data, error } = await supabase.from('clients_table').select(`payments_table(*), loans_table(*)`).eq('email', email).single()
        if(error) return alert('Network Error') 
        // console.log(data?.loans_table.filter(loan => loan.is_paid == false).length, 'LENGT')
        if(data?.loans_table.filter(loan => loan.is_paid == false).length == 0){
            setLoading(false) 
            setBalance(0)
            return 
        }
        const loan = data?.loans_table.filter(loan => loan.is_paid == false).pop(); 
        setLoan(loan?.id ? loan : 0)
        // setLoan(0)
        const payments = data?.payments_table.filter(payment => payment?.loan == loan?.id);
        const arrPayments = payments.sort((a, b) => a.id - b.id); 
        const h = arrPayments.filter(i => i.is_paid == false)
        console.log(arrPayments.filter(i => i.is_paid == false).length)
        setBalance(h.reduce((x, y) => {
            return y.amount + x
        }, 0)) 
        setData(arrPayments)
        setLoading(false) 
    }, [])

    useEffect(() => { 
        getPaymentRecord();
    }, [])

    useEffect(() => { 
        
        const subscribe = supabase.channel('any')
            .on('postgres_changes', {event: '*', schema: 'public', table: 'payments_table'}, (payload => getPaymentRecord()))
            .on('postgres_changes', {event: '*', schema: 'public', table: 'loans_table'}, (payload => getPaymentRecord()))
            .subscribe();

        return () => subscribe.unsubscribe();
            
    }, [])
 
    console.log(loading)

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getPaymentRecord} />
            }
        >
         <View style={inlineStyle.container}>
            <View style={[{marginBottom: 100, minWidth: '50%', width: '50%', elevation: 10}]}>
                {loading ? 
                    <>
                        <ActivityIndicator color='#f1c91b' size={75} />
                    </>
                : !balance ? 
                <>
                    <Text
                        style={{
                            fontSize: 20, 
                            textAlign: 'center', 
                            paddingVertical: 10, 
                            paddingHorizontal: 5
                        }}
                    >
                        Currently, there are no active loans.
                    </Text>
                </>:
                <>
                    <Text 
                        style={{
                            fontSize: 20, 
                            textAlign: 'center', 
                            paddingVertical: 10, 
                            paddingHorizontal: 5
                        }}
                    >
                        As of now your remaining balance:
                    </Text> 
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>₱ {balance}</Text>
                </>
                }
            </View>
         </View>
        </ScrollView>
    )
}

const inlineStyle = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },


})
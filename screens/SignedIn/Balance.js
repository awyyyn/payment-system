import { View, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { Image, Skeleton, Text } from '@rneui/themed' 
import supabase from '../../lib/supabaseConfig'
import { useAuth, useUser } from '@clerk/clerk-expo' 
import Table, { Section, BioCell, StaticCell, TouchableCell } from 'react-native-js-tableview';
import LoadingUI from './components/LoadingUI';
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'


export default function Balance() {
 
    const { user } = useUser();
    const email = user.emailAddresses[0].emailAddress 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loan, setLoan] = useState("")

    useEffect(() => {
        async function getPaymentRecord() {
            const { data, error } = await supabase.from('clients_table').select(`payments_table(*), loans_table(*)`).eq('email', email).single()
            if(error) return alert('Network Error') 
            const loan = data?.loans_table.filter(loan => loan.is_paid == false).pop(); 
            setLoan(loan?.id ? loan : 0)
            // setLoan(0)
            const payments = data?.payments_table.filter(payment => payment.loan == loan.id);
            const arrPayments = payments.sort((a, b) => a.id - b.id)
            setData(arrPayments)
            setLoading(false) 
        }
        getPaymentRecord();
    }, []) 
  
    console.log(data.length)

    return (
        <ScrollView contentContainerStyle={[{paddingVertical: 50,}]}> 
            <StatusBar backgroundColor='#ffde59' />
                {/* <View style={styles.between}>
                    {loading ? <Skeleton animation='pulse' height={40} /> :
                        <Text style={{fontSize: 16}}>
                            Amount Loan: <Text style={{fontWeight: '900'}}>₱ {loan}</Text>
                        </Text>
                    }
                </View> */} 

                {loading ?  
                    <View style={{ marginTop: '65%', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color='#ffde59' size={50} />
                    </View>
                    :
                    loan == 0 ? <>
                        <View style={{marginTop: 25, alignSelf: 'center'}}>
                            <Image source={{uri: 'https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png'}} 
                                style={{height: 300, width: 300, }}
                            />
                            <Text style={{fontSize: 20, textAlign: 'center', color: 'gray'}}>No Active Loan</Text>
                        </View>
                    </> : 
                    <Table style={{backgroundColor: 'transparent'}}>
                        <Section 
                            header={`₱ ${loan.amount_loan}`} 
                            headerStyle={[inlineStyle.headerText, {color: '#000000'}]}
                            footer=''
                        > 
                            {data.map(d => ( 
                                <StaticCell 
                                    key={d.id} 
                                    title={d.date} 
                                    accessoryComponent={d.is_paid ? 
                                        <Icon name="checkmark" color="green" style={{fontWeight: 'bold'}} size={32} /> :
                                        <Icon name="close" color={'red'} size={32} />
                                    } 
                                    subtitle={`₱ ${d.amount}`}
                                />
                            ))}
                        </Section>
                    </Table>
                }

                
                {/* {
                    data.map(p => (
                        <TableRow amount={p.amount} date={p.date} status={p.is_paid ? 'Paid' : '...'} key={p.id} />
                    ))
                } */} 
        </ScrollView>
    )
}

const inlineStyle = StyleSheet.create({
    headerText: {
        fontSize: Dimensions.get('window').fontScale = 25
    }

})
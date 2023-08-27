import { View, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { Skeleton, Text, Image } from '@rneui/themed' 
import supabase from '../../lib/supabaseConfig'
import { useAuth, useUser } from '@clerk/clerk-expo' 
import Table, { Section, BioCell, StaticCell, TouchableCell } from 'react-native-js-tableview';
import LoadingUI from './components/LoadingUI';
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'

export default function Payment() {
 
    const { user } = useUser();
    const email = user.emailAddresses[0].emailAddress 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loan, setLoan] = useState("")
    
    useEffect(() => {
        async function getPaymentRecord() {
            const { data: udata } = await supabase.from('clients_table').select('uuid').eq('email', email).single(); 
            const { data, error } = await supabase.from('loans_table').select(`*, payments_table(*)`).eq('client_id', udata.uuid)
            console.log(user.id)
            if(error) return alert(error.message)
  

            // const loan = data?.loans_table?.filter(loan => loan.is_paid == false).pop();
            // setLoan(loan)
            // const payments = data?.payments_table?.filter(payment => payment.loan == loan.id);
            // const arrPayments = payments.sort((a, b) => a.id - b.id)
            setData(data.sort((x, y) => y.id - x.id));
            setLoading(false) 
        }
        getPaymentRecord();
    }, []) 
  
    console.log(data.length)

    return (
        <ScrollView contentContainerStyle={[{paddingVertical: 25,}]}> 
                {/* <View style={styles.between}>
                    {loading ? <Skeleton animation='pulse' height={40} /> :
                        <Text style={{fontSize: 16}}>
                            Amount Loan: <Text style={{fontWeight: '900'}}>₱ {loan}</Text>
                        </Text>
                    }
                </View> */} 
                            
                <StatusBar backgroundColor='#ffde59' />
                {loading ?  
                    <View style={{ marginTop: '65%', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color='#ffde59' size={50} />
                    </View>
                    : 
                    data.length == 0 ?<>
                        <View style={{marginTop: 25, alignSelf: 'center'}}>
                            <Image source={{uri: 'https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png'}} 
                                style={{height: 300, width: 300, }}
                            />
                            <Text style={{fontSize: 20, textAlign: 'center', color: 'gray'}}>No History Record</Text>
                        </View>
                    </> :
                    <Table style={{backgroundColor: 'transparent'}}>
                        {data.map((a) => {

                                console.log(a)

                            return (
                                <Section 
                                    key={a.id}
                                    header={`Amount Loan: ${a.amount_loan}`}
                                    mode='inset-grouped'
                                    headerStyle={[inlineStyle.headerText, {color: 'orange'}]}
                                    // separatorInsetRight={2}
                                    separatorInsetRight={20}
                                    separatorInsetLeft={20}
                                >    
                                    {a.payments_table.sort((a, b) => a.num - b.num).map(d => ( 
                                        <StaticCell key={d.id} title={d.date} accessoryComponent={d.is_paid ? <Icon name="checkmark" color="green" style={{fontWeight: 'bold'}} size={32} /> : <Icon name="close" color={'red'} size={32} />}  
                                            // customActionTrigger='onPress'
                                            // customActionType='compose'
                                            // onAccessoryPress={() => {}}
                                            // onPress={() => {}}
                                            subtitle={`₱ ${d.amount}`}
                                        />
                                    ))}
                                </Section>
                            )
                        })}
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
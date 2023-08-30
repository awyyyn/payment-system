import { View, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles'
import { Skeleton, Text, Image } from '@rneui/themed' 
import supabase from '../../lib/supabaseConfig'
import { useAuth, useUser } from '@clerk/clerk-expo' 
import Table, { Section, BioCell, StaticCell, TouchableCell } from 'react-native-js-tableview';
import LoadingUI from './components/LoadingUI';
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import { RefreshControl } from 'react-native-gesture-handler'

export default function Payment() {
 
    const { user } = useUser();
    const email = user.emailAddresses[0].emailAddress 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresing, setRefresing] = useState(false);
    const [loan, setLoan] = useState("")
    
    const getPaymentRecord = useCallback(async() => {
        setLoading(true) 
        const { data: udata } = await supabase.from('clients_table').select('uuid').eq('email', email).single(); 
        const { data, error } = await supabase.from('loans_table').select(`*, payments_table(*)`).eq('client_id', udata.uuid)
        console.log(user.id)
        setLoan(udata.uuid)
        if(error) return alert(error.message)

        setData(data.sort((x, y) => y.id - x.id));
        setLoading(false) 
    }, [])
    
    useEffect(() => {
        getPaymentRecord();
    }, []);

    useEffect(() => {
        const subscribe = supabase
            .channel('any')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'payments_table'}, (payload => getPaymentRecord()))
            .on('postgres_changes', { event: '*', schema: 'public', table: 'loans_table'}, (payload => getPaymentRecord()))
            .subscribe()
        
        return () => subscribe.unsubscribe();
    }, [])


   

    return (
        <ScrollView 
            contentContainerStyle={[{paddingVertical: 25,}]}
            refreshControl={
                <RefreshControl refreshing={refresing} onRefresh={getPaymentRecord} />
            }    
        > 
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
                        {data.map((a, key) => {

                                console.log(a)
                                console.log(key, "key")

                            return (
                                <Section 
                                    key={key}
                                    
                                    headerComponent={ 
                                        <View key={key} style={{padding: 10, display: 'flex', rowGap: 5, borderBottomWidth: 1, borderColor: '#00000030'}}>
                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loan Amount:</Text>
                                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>₱ {a.amount_loan}</Text>
                                            </View>
                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                                                <Text style={{fontSize: 16, fontWeight: '600'}}>Interest (19%):</Text>
                                                <Text style={{fontSize: 16, fontWeight: '600'}}>₱ {Number(a.amount_loan)  * 0.19}</Text>
                                            </View>
                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                                                <Text style={{fontSize: 16, fontWeight: '600'}}>Total Amount:</Text>
                                                <Text style={{fontSize: 16, fontWeight: '600'}}>₱ {a.total_amount}</Text>
                                            </View> 
                                        </View> 
                                    }
                                    mode='inset-grouped'
                                    headerStyle={[inlineStyle.headerText, {color: 'orange'}]}
                                    // separatorInsetRight={2}
                                    separatorInsetRight={20}
                                    separatorInsetLeft={20}
                                >    
                                    {a.payments_table.sort((a, b) => a.num - b.num).map((d, z) => ( 
                                        <StaticCell key={z} title={d.date} accessoryComponent={d.is_paid ? <Icon name="checkmark" color="green" style={{fontWeight: 'bold'}} size={32} /> : <Icon name="close" color={'red'} size={32} />}  
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
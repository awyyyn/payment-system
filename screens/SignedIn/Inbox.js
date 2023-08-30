import { View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Icon, Skeleton, Text } from "@rneui/themed"; 
import { useContext, useEffect, useState } from "react";
import supabase from "../../lib/supabaseConfig";
import { UserContext } from "../../contexts/ProviderContext";
import styles from "../styles";
import Ionic from 'react-native-vector-icons/Ionicons'
import { Dialog } from "./components";
import { StatusBar } from "expo-status-bar";

 
export default function About() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(data)
    const { user } = useContext(UserContext);
    const [id, setId] = useState('');
    const [dialog, setDialog] = useState({
        title: "",
        isShow: false, 
        message: "",
        buttonTitle: "", 
    })
  
    async function getMessageData() { 
        const { data, error } = await supabase.from('sms_notifications_table').select(`*`).eq('client_id',  `${user.id}`)
        console.log(data) 
        setData(data.reverse());    
        setLoading(false);  
    } 
    useEffect(() => {
        getMessageData();  
    }, []);

    useEffect(() => {

        console.log(id, 'inside')
        const subscription = supabase.channel('any').on('postgres_changes', { event: '*', schema: 'public', table: 'sms_notifications_table'}, (payload => {
            console.log("PAYLOAD", payload)   
            if(payload.eventType === "UPDATE"){  
                if(payload.new.client_id === user.id){ 
                    if(id){
                        setData(prev => { 
                            const old = prev.filter(data => data.id !== id);
                            setId("")
                            console.log(old.id) 
                            return [...old, payload.new]
                        }); 
                    }else{
                        setData(prev => { 
                            const old = prev.filter(data => data.created_at !== payload.new.created_at); 
                            return [...old, payload.new]
                        }); 
                    }
                }
            }

            if(payload.eventType === "INSERT"){
                if(payload.new.client_id === user.id ){
                    setData((prev) => ([payload?.new, ...prev]));
                }
            }

            if(payload.eventType === "DELETE"){
                getMessageData()
            }

        })).subscribe()

        return () => subscription.unsubscribe()

    }, [id])
 
  
    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <StatusBar backgroundColor='#ffde59' />
            {loading ?  
                ['1', '2', '3', '4', '5'].map((_, i) => (
                    <Skeleton animation="pulse" key={i} height={50} style={{marginVertical: 10}} />
                ))
                :
                data?.length == 0 ? 
                    <>
                        <View style={{alignSelf: 'center'}}>
                            <Icon name="inbox" size={150} color="#cbae3b"  />
                            <Text h4 style={{color: '#cbae3b'}}>No Inbox Record</Text>
                        </View>
                    </>
                :
                data?.map((inbox, i) => (
                    <TouchableOpacity 
                        key={i} 
                        style={{
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            paddingHorizontal: 10,
                            marginVertical: 10
                        }}
                        onPress={async() => {
                            setId(inbox.id) 
                            setDialog({
                                buttonTitle: "Okay",
                                isShow: true, 
                                message: inbox.message, 
                                title: "Payment Notification",
                            })
                            await supabase.from('sms_notifications_table').update({is_read: true}).eq('id', inbox.id)
                        }}
                    >
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 15}} >
                            <Ionic name={inbox.is_read ? 'mail-open' : 'mail' } color="#f1c91b" size={40} />
                            <Text style={{fontSize: 16, fontWeight: inbox.is_read ? 'normal' : 'bold'}}>
                                {`${inbox.message.length > 15 ? `${String(inbox.message).substring(0, 20)}...` : inbox.message }`}
                                {/* {inbox.id} */}
                            </Text>
                        </View>
                        <View >  
                            <Text style={styles.textCenter}>{new Date(inbox.created_at).toLocaleDateString()}</Text>
                            <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>{new Date(inbox.created_at).toLocaleTimeString()}</Text>
                        </View>
                    </TouchableOpacity> 
                ))
            } 
            <Dialog 
                buttonTitle={dialog.buttonTitle}
                isShow={dialog.isShow}
                message={dialog.message}
                title={dialog.title}
                handleBtn1={() => setDialog({...dialog, isShow: false})}
                handleClose={() => setDialog({...dialog, isShow: false})}
            />
        </ScrollView>
    )
}

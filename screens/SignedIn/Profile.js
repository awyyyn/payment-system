import { ScrollView, View } from 'react-native' 
// import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, Text } from '@rneui/themed'
import styles from '../styles'
import { UserContext } from '../../contexts/ProviderContext';
import { Input } from './components'
import { Button } from 'react-native-elements'
import { useClerk } from '@clerk/clerk-expo'
import { useState } from 'react'
import supabase from '../../lib/supabaseConfig'

export default function Profile() {

    const [edit, setEdit] = useState(false)
    const { user, setUser } = useContext(UserContext); 
    const [data, setData] = useState({
        lname: user.lastName,
        fname: user.firstName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
        address: user.address
    }); 
    const clerk = useClerk()
    const ss = async() => {
        // const data = await clerk.user.delete()
    }
    



    const handleSave = async() => {

        if(data.phoneNumber != user.phoneNumber) {
            const {data: checkNumber} = await supabase.from('clients_table').select().eq('contact', data.phoneNumber);

            console.log(checkNumber)
        }


        // setEdit(true);
    }

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <StatusBar backgroundColor='#ffde59' />
            <View style={{alignItems: 'center'}}> 
                <Image source={{uri: user.imageUrl}} style={{width: 150, height: 150, borderRadius: 100}} alt='Profile Image' />
                <View style={{ minWidth: 280, marginTop: 40, rowGap: 20 }}> 
                    {edit == true ? 
                        <>
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                value={data.fname}
                                label="First Name"
                                handleChange={(text) => setData(p => ({...p, fname: text}))}
                                disabled={!edit}
                            />
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                value={data.middleName}
                                label="Middle Name"
                                handleChange={(text) => setData(p => ({...p, middleName: text}))}
                                disabled={!edit}
                            /> 
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                handleChange={(text) => setData(p => ({...p, lname: text}))}
                                value={data.lname}
                                label="Last Name"
                                disabled={!edit}
                            />
                            <Input
                                customStyles={{textTransform: 'capitalize'}}
                                handleChange={(text) => setData(p => ({...p, address: text}))}
                                value={data.address}
                                label="Address"
                                disabled={!edit}
                            />
                            <Input
                                value={data.phoneNumber}
                                handleChange={(text) => setData(p => ({...p, phoneNumber: text}))}
                                label="Contact #"
                                disabled={!edit}
                            />
                        </> :
                        <>
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                value={`${user.firstName} ${user.middleName} ${user.lastName}`}
                                label="Client Name"
                                disabled={!edit}
                            />
                            <Input
                                customStyles={{textTransform: 'capitalize'}}
                                value={`${user.address}`}
                                label="Address"
                                disabled={!edit}
                            />
                            <Input
                                value={`${user.phoneNumber}`}
                                label="Contact #"
                                disabled={!edit}
                            />
                        </>
                    }
                </View>
                <View style={{minWidth: 280, marginTop: 20}}> 
                    {edit ? 
                        <>
                            <Button 
                                title="Save" 
                                containerStyle={{
                                    width: '100', 
                                    backgroundColor: '#f1c91b', 
                                    borderColor: '#00000000'
                                }} 
                                titleStyle={{color: '#123321'}}  
                                type='outline'   
                                onPress={handleSave}
                            />
                            <Button 
                            title="Cancel" 
                            containerStyle={{
                                width: '100', 
                                marginTop: 20, 
                                backgroundColor: '#FF0000', 
                                borderColor: '#00000000'
                            }} 
                            titleStyle={{color: 'white'}}  
                            type='outline'   
                            onPress={() => {
                                setEdit(false);
                            }}
                        />
                        </> :
                        <>
                            <Button 
                                title="Edit" 
                                containerStyle={{
                                    width: '100', 
                                    backgroundColor: '#f1c91b', 
                                    borderColor: '#00000000'
                                }} 
                                titleStyle={{color: '#123321'}}  
                                type='outline'   
                                onPress={() => {
                                    setEdit(true);
                                }}
                            />
                            <Button 
                                title="Delete" 
                                containerStyle={{
                                    width: '100', 
                                    marginTop: 20, 
                                    backgroundColor: '#FF0000', 
                                    borderColor: '#00000000'
                                }} 
                                titleStyle={{color: 'white'}}  
                                type='outline'   
                            />
                        </>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
import { ScrollView, View } from 'react-native' 
// import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Dialog, Image, Text } from '@rneui/themed'
import styles from '../styles'
import { UserContext } from '../../contexts/ProviderContext';
import { Input } from './components'
import { Button } from 'react-native-elements'
import { useAuth, useClerk,  } from '@clerk/clerk-expo'
import { useState } from 'react'
import supabase from '../../lib/supabaseConfig'

export default function Profile() {

    const [edit, setEdit] = useState(false)
    const { user, setUser } = useContext(UserContext); 
    const [deleting, setDeleting] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [data, setData] = useState({
        lname: user.lastName,
        fname: user.firstName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
        address: user.address
    }); 
    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState({
        contact: '',
    })
    const clerk = useClerk() 
    const { signOut } = useAuth() 
     



    const handleSave = async() => {

        if(data.phoneNumber.length != 11){
            return setErrors(p => ({...p, contact: "Invalid format!"}))
        }else{
            setErrors(p => ({...p, contact: ""}))
        }

        setSaving(true)

        if(data.phoneNumber != user.phoneNumber) {
            const {data: checkNumber} = await supabase.from('clients_table').select().eq('contact', data.phoneNumber);

        if(checkNumber.length > 0){
            setSaving(false)
                setErrors(p => ({...p, contact: "Phone number is taken."}))
                return
            }
        }
        

        await supabase.from("clients_table")
            .update({
                contact: data.phoneNumber,
                first_name: data.fname,
                middle_name: data.middleName,
                last_name: data.lname,
                address: data.address
            })
            .eq('uuid', user?.id)

        setUser(p => ({
            ...p,  
            firstName: data.fname, 
            middleName: data.middleName,
            lastName: data.lname,
            phoneNumber: data.phoneNumber,
            address: data.address, 
        }))
        
        setSaving(false)
        setEdit(false)
        // setEdit(true);
    }


    const handleDelete  = async() => {
        setDeleting(true)
        await supabase.from('clients_table').delete().eq('uuid', user.id)
        await clerk.user.delete();

        setUser({ 
            id: '',
            email: '',
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            imageUrl: '',
            created_at: '', 
        })

        signOut()
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
                                disabled={!edit || saving}
                            />
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                value={data.middleName}
                                label="Middle Name"
                                handleChange={(text) => setData(p => ({...p, middleName: text}))}
                                disabled={!edit || saving}
                            /> 
                            <Input  
                                customStyles={{textTransform: 'capitalize'}}
                                handleChange={(text) => setData(p => ({...p, lname: text}))}
                                value={data.lname}
                                label="Last Name"
                                disabled={!edit || saving}
                            />
                            <Input
                                customStyles={{textTransform: 'capitalize'}}
                                handleChange={(text) => setData(p => ({...p, address: text}))}
                                value={data.address}
                                label="Address"
                                disabled={!edit || saving}
                            />
                            <Input
                                value={data.phoneNumber}
                                handleChange={(text) => {
                                    if(!/^\d+$/.test(text)){
                                        return
                                    }
                                    setData(p => ({...p, phoneNumber: text}))
                                }}
                                label="Contact #"
                                disabled={!edit || saving}
                                errorMessage={errors.contact && errors.contact}
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
                                loading={saving}
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
                                setData({
                                    fname: user.firstName,
                                    address: user.address,
                                    lname: user.lastName,
                                    phoneNumber: user.phoneNumber,
                                    middleName: user.middleName,
                                });
                                setErrors({
                                    contact: ""
                                })
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
                                onPress={() => setDialog(true)}
                                titleStyle={{color: 'white'}}  
                                type='outline'   
                            />
                        </>
                    }
                </View>
            </View>
            <Dialog isVisible={dialog} > 
                <Dialog.Title title='Delete Account' />
                <Text style={{fontSize: 20, marginVertical: 10}}>{!deleting ? "Delete your account?" : "Deleting your account..."}</Text>
                <Dialog.Actions >
                    <Dialog.Button 
                        buttonStyle={{backgroundColor: 'red', paddingHorizontal: 30}}
                        titleStyle={{color: '#FFF'}}
                        title={"Yes"}
                        loading={deleting}
                        onPress={handleDelete}
                        />
                    <Dialog.Button 
                        buttonStyle={{ marginRight: 10, paddingHorizontal: 30}}
                        title={"No"}
                        disabled={deleting}
                    />
                </Dialog.Actions>
            </Dialog>
        </ScrollView>
    )
}
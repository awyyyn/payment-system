import { ScrollView, View } from 'react-native' 

import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, Text } from '@rneui/themed'
import styles from '../styles'
import { UserContext } from '../../contexts/ProviderContext';
import { Input } from './components'

export default function Profile() {

    const { user, setUser } = useContext(UserContext);
    console.log(user)

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <StatusBar backgroundColor='#ffde59' />
            <View style={{alignItems: 'center'}}> 
                <Image source={{uri: user.imageUrl}} style={{width: 150, height: 150, borderRadius: 100}} alt='Profile Image' />
                <View style={{ minWidth: 280, marginTop: 40, rowGap: 20 }}> 
                    <Input
                        value={`${user.firstName} ${user.lastName}`}
                        label="Client Name"
                        disabled={true}
                    />
                    <Input
                        value={`${user.address}`}
                        label="Address"
                        disabled={true}
                    />
                    <Input
                        value={`${user.phoneNumber}`}
                        label="Contact #"
                        disabled={true}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
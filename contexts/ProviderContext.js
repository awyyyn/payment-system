import { View, Text } from 'react-native'
import React from 'react'

const initialValue = { 
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    imageUrl: ''
}

export const UserContext = React.createContext();

export default function ProviderContext({children}) {

    const [user, setUser] = React.useState(initialValue);
 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
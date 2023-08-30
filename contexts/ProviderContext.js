import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';

const initialValue = { 
    id: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    imageUrl: '',
    created_at: '',
}

export const UserContext = React.createContext();

export default function ProviderContext({children}) {

    const { user: userData } = useUser();

    console.log("USER DATA", userData)

    const [user, setUser] = React.useState(initialValue);
 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
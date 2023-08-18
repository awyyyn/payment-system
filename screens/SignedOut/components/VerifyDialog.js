import { View, Text } from 'react-native'
import { useState } from 'react'
import { Button, Dialog, Input } from '@rneui/themed' 
import styles from '../../styles'

export default function CustomDialog({
    isShow,
    handleModal, 
    isLoading,
    handleVerification
}) {

    const [code, setCode] = useState("")
    

    return ( 
        <Dialog
            isVisible={isShow}  
        > 
            <Dialog.Title title="Verification Code"  titleStyle={[{fontSize: 25}, styles.textCenter]} />
            {/* <Dialog.Loading  /> */}
            <View >
                <Text style={[styles.textCenter, {color: 'gray'}]}>
                    Enter the verification code
                </Text>
                <Text style={[styles.textCenter, {color: 'gray', marginBottom: 20}]}>
                    to complete sign up.
                </Text>
                <Input 
                    maxLength={6}
                    keyboardType='decimal-pad'
                    inputStyle={{letterSpacing: 23}}
                    value={code}
                    onChangeText={(value) => setCode(value) }
                />
            </View>
            <Dialog.Actions >
                <View style={{flexDirection: 'row', columnGap: 10, }}>
                    <Button
                        color={'error'}
                        title="Cancel"  
                        radius={8}
                        disabled={isLoading}
                        onPress={handleModal}
                    />
                    <Button
                        title="Verify"
                        color="#f1c91b" 
                        radius={8}
                        loading={isLoading}
                        onPress={() => handleVerification(code)}
                    />
                </View>
            </Dialog.Actions> 
        </Dialog>
    )
}
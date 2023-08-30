import { View, Text } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import styles from '../../styles'

export default function CustomInput({
    value,
    disabled,
    customStyles,
    label,
    handleChange,
    errorMessage
}) {

    return (
        <Input
            label={label}
            labelStyle={styles.labelStyle}
            value={value}
            onChangeText={(text) => {
                if(value.slice(0, 2) == '09'){
                    if(value.length == 2){

                    }else{
                        handleChange(text)
                    }
                }else{
                    handleChange(text)
                }
            }}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={[styles.input, customStyles]}
            errorMessage={errorMessage && errorMessage}
            style={{borderWidth: 0}}
            maxLength={label.toLowerCase().includes("contact") ? 11 : 30}
            containerStyle={[{width: 'auto'}, styles.inputContainer]}
            disabled={disabled}
        />  
    )
}
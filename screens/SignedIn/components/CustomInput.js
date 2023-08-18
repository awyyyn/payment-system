import { View, Text } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import styles from '../../styles'

export default function CustomInput({
    value,
    disabled,
    customStyles,
    label
}) {

    return (
        <Input
            label={label}
            labelStyle={styles.labelStyle}
            value={value}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.input}
            style={{borderWidth: 0}}
            containerStyle={[{width: 'auto'}, styles.inputContainer]}
            disabled={disabled}
        />  
    )
}
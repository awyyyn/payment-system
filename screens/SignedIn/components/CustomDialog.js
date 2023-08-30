import { View, Text } from 'react-native'
import React from 'react'
import { Dialog } from '@rneui/themed'

export default function CustomDialog({
    title,
    isShow,
    handleClose,
    message,
    buttonTitle,
    handleBtn1
}) {
    return (
        <Dialog isVisible={isShow} onDismiss={handleClose}>
            <Dialog.Title title={title} />
            <Text style={{lineHeight: 25, letterSpacing: 1}}>{message}</Text>
            <Dialog.Actions>
                <Dialog.Button title={buttonTitle} onPress={handleBtn1} />
            </Dialog.Actions>
        </Dialog>
    )
}
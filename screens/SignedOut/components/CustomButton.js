import { Button } from '@rneui/themed'
import React from 'react';
import styles from '../../styles'

export default function CustomButton({
    handleFunction,
    isLoading,
    isError, 
    title, 
}) {


    return <Button 
        loading={isLoading}
        title={title}
        containerStyle={styles.buttonContainer}
        // containerStyle={styles.buttonContainer}
        color="#f1c91b" 
        titleStyle={{color: '#2e5814'}}
        disabled={isError} 
        onPress={handleFunction}  
        size="lg"
        radius={10}
    /> 
}
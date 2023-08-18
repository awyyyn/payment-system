import { Input } from '@rneui/themed'
import React from 'react'

export default function CustomInput({
    label,
    value,
    handleChange,
    secureText,
    disabled,
    placeholder,
    rightIcon,
    keyboardType,
    containerStyle,
    style,
    errorMessage,
    errorStyle,
    onBlur,
    labelStyle,
    inputStyle, 
}) {
    return (
        <Input  
            focusable
            containerStyle={containerStyle}
            inputContainerStyle={inputStyle}
            style={style}
            label={label}
            autoComplete='off'
            labelStyle={labelStyle}
            value={value}
            onChangeText={(value) => handleChange(value)}
            secureTextEntry={secureText}
            disabled={disabled}
            placeholder={placeholder}
            placeholderTextColor="#493f1470"
            keyboardType={keyboardType}
            blurOnSubmit
            selectTextOnFocus 
            errorMessage={errorMessage}
            errorStyle={errorStyle}
            onBlur={onBlur}
            rightIcon={rightIcon && rightIcon} 
        />
    )
}

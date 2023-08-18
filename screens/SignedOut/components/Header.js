import { Image, Text } from '@rneui/themed'
import { View   } from 'react-native'

export default function Header({title, subtitle}) {
  
    return  (
        <>
            <Image source={require('../../../assets/logo.png')} style={{height: 150, width: 150}} />
                <View  style={{rowGap: -2}}>
                {
                    title &&
                    <Text h3={title?.includes("Create") || title == "Verification"} h2={title?.includes("Log")} style={styles.textCenter}>{title}</Text>
                }
                {
                    subtitle && 
                    <Text style={[styles.textCenter, {fontSize: 15}]}>{subtitle}</Text>
                }
            </View>
        </>
    )
}

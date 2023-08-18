import { View, ScrollView } from "react-native";
import { Text } from "@rneui/themed"; 

 
export default function About() {
    return (
        <ScrollView contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 10}}>
            <View style={styles.mission}>
                <Text style={[ styles.minWidth, styles.title]}> Mission</Text>
                <Text style={[styles.uppercase, styles.paragraph]}> 
                We are bound to help the employees and customers to uplift their economic status.
                </Text>
                <Text style={[styles.uppercase, styles.paragraph]}> 
                To serve as an eye opener to both employees and customers on how to be responsible.
                </Text>
                <Text style={[styles.uppercase, styles.paragraph]}> 
                To produce a trustworthy, disciplined and goal oriented individual who will be a future leader that will create opportunity to others.
                </Text>
            </View>
            <View style={[styles.mission, { marginTop: 30}]}>

            <Text style={[ styles.minWidth, styles.title]}> Vision</Text>
                <Text style={[styles.uppercase, styles.paragraph]}> 
                To be one of the best and leading company that focuses on the welfare of the employees, customers and community by nurturing then on how to be a responsible individual not just for themselves but also to others.
                </Text> 
            </View>
        </ScrollView>
    )
}

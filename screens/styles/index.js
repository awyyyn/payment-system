import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    signedOutContainer: { 
        height: '100%',
        width: Dimensions.get('window').width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgYellow: {
        backgroundColor: '#FFF'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
    },
    textCenter: {
        textAlign: 'center'
    },
    inputContainer: {
        width: 300,
        minWidth: 250,   
    },  
    input: {
        backgroundColor: '#00000020',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    passwordStyleInput: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    password: { 
        backgroundColor: '#00000020',
        borderRadius: 10, 
        borderBottomWidth: 0,
        paddingRight: 10
    },
    labelStyle: {
        marginBottom: 5, color: '#00000095', fontWeight: 'normal', textTransform: 'uppercase', fontSize: 13
    },
    buttonContainer: {
        width: 280,  
        marginTop: 10,  
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    link: {
        marginBottom: 5, 
        color: '#524406',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    loadingUI: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    mission: {
        maxWidth: Dimensions.get('window').width - 45,
        minWidth: Dimensions.get('window').width - 45,
        // backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        alignSelf: 'center'
    },
    paragraph: {  
        textAlign: 'justify',
        alignSelf: 'center',
        // backgroundColor: 'red',
        lineHeight: 25,
        color: '#0d3506CC'
        
    },
    title: {
        fontSize: 30,
        padding: 0,
        marginLeft: -10,
        fontWeight: 'bold', 
        color: '#0d3506'
    },
    payment: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 30,
        // backgroundColor: 'red'
    },
    between:  {
        justifyContent: "space-between",
        width: 'auto'
    },
    cell: {
        maxWidth: '33.3%',
        width: '33.3%',  
        justifyContent: 'center',
        paddingVertical: 7, 
    },
    tableHeaderText: {
        textAlign: 'center',
        fontWeight :'bold',
        fontSize: 15,
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: '#0d3506'
    },
    row: {
        width: 'auto', display: 'flex', flexDirection: 'row'
    },
    borderTop: {
        borderTopColor: '#0d3506', borderTopWidth: 1
    }, 
    tableText: {
        textAlign: 'center', 
        fontSize: 12,
    },
    table: {
        borderWidth: 1, borderColor: '#0d3506',
        marginTop: 8
    },
    recordText: {
        textAlign: 'center',  
    }
})
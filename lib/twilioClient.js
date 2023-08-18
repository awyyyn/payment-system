 
import Twilio from "twilio";

const client = new Twilio(
    process.env.EXPO_PUBLIC_TWILIO_SSID,
    process.env.EXPO_PUBLIC_TWILIO_KEY
);


export default function sendSMS (number, message) {
    return client.messages.create({
        body: message,
        from: '+18146373393',
        to: `63${number.slice(1)}`
    }).then(res => {
        console.log(res);
        return res
    }).catch(err => {
        console.log(err)
        return err
    })
}
 
/* 

    const data = twilionClient.messages.create({
            from: "+18146373393",
            to: `63${number}`
        })
*/
import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
    apiKey: "68c8de6a",
    apiSecret: "A6idrdhXn2GNILT8"
});

const from = "Vonage APIs";
const to = "919711070629";

async function sendSMS(text) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
};

export default sendSMS;

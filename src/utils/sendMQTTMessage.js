import { Constants } from 'expo';
/*
send(topic, payload, qos, retained)
    Send a message to the consumers of the destination in the Message.
Parameters:
    topic	    string | Paho.MQTT.Message	mandatory The name of the destination to which the message is to be sent. - 
                                                    If it is the only parameter, used as Paho.MQTT.Message object.
    payload	    String | ArrayBuffer	    The message data to be sent.
    qos	        number	                    The Quality of Service used to deliver the message.
                    0 Best effort (default).
                    1 At least once.
                    2 Exactly once.
    retained	Boolean	If true, the message is to be retained by the server and delivered to both current and future subscriptions. 
                                If false the server only delivers the message to current subscribers, 
                                this is the default for new Messages. A received message has the retained 
                                boolean set to true if the message was published with the retained boolean set to 
                                true and the subscrption was made after the message has been published.
---------------------------------------------------------------------------------------------------------------------------
payload = 
{
   "reference": "abcd1234",                  // reference which will be used on ack or error (this can be a random string)
    "confirmed": true,                        // whether the payload must be sent as confirmed data down or not
    "fPort": 10,                              // FPort to use (must be > 0)
    "data": "...."                            // base64 encoded data (plaintext, will be encrypted by LoRa Server)
    "object": {                               // decoded object (when application coded has been configured)
        "temperatureSensor": {"1": 25},       // when providing the 'object', you can omit 'data'
        "humiditySensor": {"1": 32}
    }
}
*/

function sendMQTTMessage(client, applicationID, devEUI, payload) {
    return new Promise((resolve, reject) => {
        let message = {
            reference: Constants.deviceId,
            confirmed: true,
            fPort: 1,
            object: payload
        };

        try {
            //const applicationID = this.state.nodes[devEUI].applicationID;

            const topic = `application/${applicationID}/node/${devEUI}/tx`;

            if (client) {
                client.send(topic, JSON.stringify(message), 0, false);
                resolve('Message sent');
            }
            else {
                resolve('Client not connected');
            }
        }
        catch (e) {
            reject('Message exception');
        }
    });
}

export default sendMQTTMessage;
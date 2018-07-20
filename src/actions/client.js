import { CLIENT_SET, CLIENT_CLEAR } from '../types'
import {
    subscribeMQTT,
    connectMQTTClient,
    sendMQTTMessage,
} from '../core'
import subscriptions from '../configs/subscriptions'

export const clientSet = (client) => {
    console.log('client set')
    return {
        type: CLIENT_SET,
        payload: client
    }
}

export const clientClear = () => {
    return {
        type: CLIENT_CLEAR
    }
}

export const clientConnect = () => (dispatch, getState) => {
    const { config, client } = getState();
    if (client) client.disconnect();

    connectMQTTClient(config)
        .then(client => {
            subscribeMQTT(client, subscriptions);
            dispatch(clientSet(client));
        })
        .catch(() => dispatch(clientClear()));
}

export const clientSendMessage = (devEUI, messagePayload) => (dispatch, getState) => {
    const { client, nodes } = getState();
    const applicationID = nodes[devEUI].applicationID;
    sendMQTTMessage(client, applicationID, devEUI, messagePayload);
}

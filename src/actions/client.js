import { CLIENT_SET, CLIENT_CLEAR } from '../types'
import {
    subscribeMQTT,
    connectMQTTClient,
    sendMQTTMessage,
} from '../core'
import subscriptions from '../configs/subscriptions'
import { setConnected, setToast } from './common'

export const clientSet = client => dispatch => {
    dispatch(setConnected());
    dispatch({
        type: CLIENT_SET,
        payload: client
    });
}

export const clientClear = () => {
    return {
        type: CLIENT_CLEAR
    }
}

export const clientConnect = () => (dispatch, getState) => {
    const { config, client } = getState();

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
    sendMQTTMessage(client, applicationID, devEUI, messagePayload)
        .then(message => dispatch(setToast(message)))
        .catch(message => dispatch(setToast(message)));
}

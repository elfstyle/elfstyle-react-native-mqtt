import { CLIENT_SET, CLIENT_CLEAR } from '../types'
import {
    connectMQTTClient,
} from '../core'

export const clientSet = (client) => {
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
        .then(client => dispatch(clientSet(client)))
        .catch(() => dispatch(clientClear()));
}

import { AsyncStorage } from 'react-native';
import init from 'react_native_mqtt';
import { Constants } from 'expo';
import {
    debugLog,   
    handleOnConnectionLost,
    handleOnFailure,
    handleOnMessageArrived,
} from '../utils'

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});

//connection of MQTT Client with config 
function connectMQTTClient(
    config,
    cbOnMessageArrived = handleOnMessageArrived,
    cbOnFailure = handleOnFailure,
    cbOnConnectionLost = handleOnConnectionLost) {

    return new Promise((resolve, reject) => {
        try {
            debugLog('connectMQTTClient');
            const client = new Paho.MQTT.Client('127.0.0.1', 8080, Constants.deviceId);

            let handleOnConnectLocal = () => {
                debugLog('handleOnConnect');
               
                client.subscribe('gateway/+/stats');
                client.subscribe('application/+/node/#', { qos: 1 });
            };

            client.onConnectionLost = cbOnConnectionLost;
            client.onMessageArrived = cbOnMessageArrived;
            client.connect({
                //onSuccess: cbOnConnect.bind(client),
                onSuccess: handleOnConnectLocal,
                onFailure: cbOnFailure,
                useSSL: config.useSSL,
                reconnect: config.reconnect,
                cleanSession: config.cleanSession,
                hosts: [config.hostA, config.hostB],
                ports: [parseInt(config.portA), parseInt(config.portB)],
                userName: config.userName,
                password: config.password,
                timeout: parseInt(config.timeout),
                keepAliveInterval: parseInt(config.keepAliveInterval),
            });
            resolve(client);
        }
        catch (e) {
            reject(null);
        }
    });
}

export default connectMQTTClient;
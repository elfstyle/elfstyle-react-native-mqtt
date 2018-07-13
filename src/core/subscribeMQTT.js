import { debugLog } from '.'

function subscribeMQTT(client, subscriptionsArray) {
    debugLog('subscribeMQTT');
    subscriptionsArray.forEach(subscriptionString => {
        try {
            client.subscribe(subscriptionString, { qos: 1 });
            debugLog('subscribe', subscriptionString);
        }
        catch (e) {
            debugLog(e);
        }
    });
}

export default subscribeMQTT;
import { storeGatewaysAdd } from '../store/actions/gateways'
import { storeNodesAdd } from '../store/actions/nodes'
import { storeNodeDetailsAdd } from '../store/actions/nodeDetails'
import {
    debugLog,
    consoleLog
} from '.'

function handleOnMessageArrived(message) {
    //debugLog('handleOnMessageArrived', message.payloadString);
    let payload;

    try {
        payload = JSON.parse(message.payloadString);

        //populating state.gateways
        if (message.destinationName.startsWith('gateway')) {
            storeGatewaysAdd(payload);
        }

        //populating state.nodes object
        if (message.destinationName.startsWith('application') && message.destinationName.endsWith('rx')) {
            if (payload.object) {
                storeNodesAdd(payload);
            }
        }

        //populating state.nodeDetails object
        if (message.destinationName.startsWith('application') && message.destinationName.endsWith('details')) {
            storeNodeDetailsAdd(payload);
        }

        consoleLog(`${message.destinationName} QoS: ${message.qos} `, message.payloadString);
    }
    catch (e) {
        consoleLog(
            `${message.destinationName} QoS: ${message.qos} `,
            `can't parse payloadString ${message.payloadString}`
        );
    }
};

export default handleOnMessageArrived;
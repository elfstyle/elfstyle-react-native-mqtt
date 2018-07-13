import { storeGatewaysAdd } from '../actions/gatewaysActions'
import { storeNodesAdd } from '../actions/nodesActions'
import { storeNodeDetailsAdd } from '../actions/nodeDetailsActions'
import {
    debugLog,
    consoleLog
} from '.'

function handleOnMessageArrived(message) {
    debugLog('handleOnMessageArrived', message.payloadString);
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
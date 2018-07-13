import { debugLog } from '.'

function handleOnMessageArrived (message)  {
    debugLog('handleOnMessageArrived', message.payloadString);
    // let payload;

    // try {
    //     payload = JSON.parse(message.payloadString);

    //     //populating state.gateways object
    //     if (message.destinationName.startsWith('gateway')) {
    //         var gatewaysClone = Object.assign({}, this.state.gateways);
    //         gatewaysClone[payload.mac] = payload;
    //         //this.setState({ gateways: gatewaysClone });
    //     }

    //     //populating state.nodes object
    //     if (message.destinationName.startsWith('application') && message.destinationName.endsWith('rx')) {
    //         if (payload.object) {
    //             var nodesClone = Object.assign({}, this.state.nodes);
    //             nodesClone[payload.devEUI] = payload;
    //             //this.setState({ nodes: nodesClone });
    //         }
    //     }

    //     //populating state.nodeDetails object
    //     /*
    //     {
    //         devEUI: "5cca7affff7c707e",
    //         devName: "Coditioner",
    //         config: {
    //             powerOn: {
    //                 type: "boolean",
    //                 name: "Power",
    //                 units: null,
    //                 states: ["Off", "On"]
    //             }
    //         },
    //         control: {
    //             powerOn: ["Off", "On"]
    //         }
    //     }
    //     */
    //     if (message.destinationName.startsWith('application') && message.destinationName.endsWith('details')) {
    //         var nodeDetailsClone = Object.assign({}, this.state.nodeDetails);
    //         nodeDetailsClone[payload.devEUI] = payload;
    //         //this.setState({ nodeDetails: nodeDetailsClone });
    //     }

    //     //this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, message.payloadString);
    // }
    // catch (e) {
    //     // this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, `can't parse payloadString 
    //     // ${message.payloadString}`);
    // }
};

export default handleOnMessageArrived;
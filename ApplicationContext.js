import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';
import { Constants } from 'expo';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});

const ApplicationContext = React.createContext();
export class Provider extends Component {
    constructor(props) {
        super(props)

        //console.log( Constants.deviceId);

        const client = new Paho.MQTT.Client('10.10.10.215', 8083, Constants.deviceId);
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect({
            onSuccess: this.onConnect,
            useSSL: false,
            reconnect: true,
            cleanSession: false,
            hosts: ["178.136.225.95"],
            ports: [7778]
        });

        this.state = {
            client,
            connected: false,
            console: [],
            gateways: {},
            nodes: {}
        };
    }

    // writes message to console array
    consoleLog = (title, message = "") => {
        this.setState({ console: [...this.state.console, new ConsoleMessage(title, message)] });
    }

    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/+/stats');
        client.subscribe('application/+/node/#', { qos: 1 });

        this.setState({ connected: true });
        this.consoleLog("connected");
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
        this.consoleLog(responseObject.errorMessage);
    };

    onMessageArrived = message => {
        let payload;

        try {
            payload = JSON.parse(message.payloadString);
        }
        catch (e) {
            payload = message.payloadString;
        }

        //populating state.gateways object
        if (message.destinationName.startsWith('gateway')) {
            var gatewaysClone = Object.assign({}, this.state.gateways);
            gatewaysClone[message.destinationName] = payload;
            this.setState({ gateways: gatewaysClone });
        }

        //populating state.nodes object
        if (message.destinationName.startsWith('application')) {
            var nodesClone = Object.assign({}, this.state.nodes);
            nodesClone[message.destinationName] = payload;
            this.setState({ nodes: nodesClone });
        }

        this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, message.payloadString);
    };

    render() {
        return (
            <ApplicationContext.Provider value={{
                state: this.state,
                actions: {
                }
            }}>
                {this.props.children}
            </ApplicationContext.Provider >
        )
    }
}

export const Consumer = ApplicationContext.Consumer;

class ConsoleMessage {
    static currentId = 0;
    constructor(title, message = '') {
        ConsoleMessage.currentId += 1;
        this.id = ConsoleMessage.currentId;
        this.title = title;
        this.message = message;
    }
}

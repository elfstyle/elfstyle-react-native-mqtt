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

        this.state = {
            client: {},
            connected: false,
            console: [],
            gateways: {},
            nodes: {}
        };
    }

    connectMQTTClient = () => {
        let Config = {
            hostA: '10.10.10.215',
            portA: 8083,
            hostB: '178.136.225.95',
            portB: 7778
        }

        this.initMQTTClient(Config);
    }

    initMQTTClient = (Config) => {
        const client = new Paho.MQTT.Client(Config.hostA, Config.portB, Constants.deviceId);
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect({
            onSuccess: this.onConnect,
            useSSL: false,
            reconnect: true,
            cleanSession: false,
            hosts: [Config.hostB],
            ports: [Config.portB]
        });
        this.setState({ client });
    }

    // writes message to console array
    consoleLog = (title, message = "") => {
        const consoleDepth = 50;
        this.setState({ console: [new ConsoleMessage(title, message), ...(this.state.console.slice(0, consoleDepth - 1))] });
    }

    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/+/stats');
        client.subscribe('application/+/node/#', { qos: 1 });

        this.setState({ connected: true });
        this.consoleLog("connected", `
            host: ${client.host}:${client.port}
            path: ${client.path}
            clientId: ${client.clientId}
            `);
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
        this.consoleLog(responseObject.errorMessage);
    };

    /*    
    message:
        payloadString	string	read only The payload as a string if the payload consists of valid UTF-8 characters.
        payloadBytes	ArrayBuffer	read only The payload as an ArrayBuffer.
        destinationName	string	mandatory The name of the destination to which the message is to be sent (for messages about to be sent) or the name of the destination from which the message has been received. (for messages received by the onMessage function).
        qos	number	The Quality of Service used to deliver the message.
                    0 Best effort (default).
                    1 At least once.
                    2 Exactly once.
        retained	Boolean	If true, the message is to be retained by the server and delivered to both current and future subscriptions. If false the server only delivers the message to current subscribers, this is the default for new Messages. A received message has the retained boolean set to true if the message was published with the retained boolean set to true and the subscrption was made after the message has been published.
        duplicate	Boolean	read only If true, this message might be a duplicate of one which has already been received. This is only set on messages received from the server.
    */
    onMessageArrived = message => {
        let payload;

        try {
            payload = JSON.parse(message.payloadString);

            //populating state.gateways object
            if (message.destinationName.startsWith('gateway')) {
                var gatewaysClone = Object.assign({}, this.state.gateways);
                gatewaysClone[payload.mac] = payload;
                this.setState({ gateways: gatewaysClone });
            }

            //populating state.nodes object
            if (message.destinationName.startsWith('application') && message.destinationName.endsWith('rx')) {
                if (payload.object) {
                    var nodesClone = Object.assign({}, this.state.nodes);
                    nodesClone[payload.devEUI] = payload;
                    this.setState({ nodes: nodesClone });
                }
            }

            this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, message.payloadString);
        }
        catch (e) {
            this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, `can't parse payloadString 
            ${pamessage.payloadString}`);
        }
    };

    componentDidMount = () => {
        this.connectMQTTClient();
    }

    render() {
        return (
            <ApplicationContext.Provider value={{
                state: this.state,
                actions: {
                    connectMQTTClient: this.connectMQTTClient
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
        this.body = message;
        this.dateTime = new Date();
    }
}

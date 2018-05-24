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
            client:{},
            connected: false,
            console: [],
            gateways: {},
            nodes: {}
        };
    }

    connectMQTTClient = ()=>{
        let Config = {
            hostA: '10.10.10.215',
            portA: 8083,
            hostB: '178.136.225.95',
            portB: 7778        
        }

        this.initMQTTClient(Config);
    }

    initMQTTClient = (Config)=>{
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
        this.setState({client});
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
        this.message = message;
        this.dateTime = new Date();
    }
}

import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Constants } from 'expo';
import Config from './src/Config';

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
            currentConfig: {},
            client: null,
            connected: false,
            console: [],
            gateways: {},
            nodes: {},
            nodeDetails: {},
            nodesElapsedTime: {},
        };
    }

    //tries to receive current config from AsyncStorage and combine it with 
    //default config object
    getCurrentConfig = async () => {
        //default configuration
        let defaultConfig = new Config();

        let storedConfig = {};

        try {
            const storedConfigString = await AsyncStorage.getItem('Config');
            if (storedConfigString) {
                storedConfig = JSON.parse(storedConfigString);
            }
        } catch (error) {
            this.consoleLog('Could not find stored config',
                `Client will use default values for connect:  ${JSON.stringify(defaultConfig)}`);
        }

        let currentConfig = Object.assign(defaultConfig, storedConfig);
        this.setState({ currentConfig })
        return currentConfig;
    }

    //saves Configuration to AsyncStorage
    saveConfig = async (config) => {
        try {
            await AsyncStorage.setItem('Config', JSON.stringify(config));
            this.consoleLog('Configuration saved', JSON.stringify(config));
            ToastAndroid.showWithGravity(
                'Saved',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        } catch (error) {
            this.consoleLog('Configuration not saved', JSON.stringify(error));
            ToastAndroid.showWithGravity(
                'Not Saved',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
        await this.connectMQTTClient();
    }

    //connection of MQTT Client with Config 
    connectMQTTClient = async () => {
        try {
            if (this.state.client) {
                this.state.client.disconnect();
            }
        }
        catch (e) {
            this.consoleLog('Client is not connected');
        }

        const Config = await this.getCurrentConfig();
        try {
            const client = new Paho.MQTT.Client('127.0.0.1', 8080, Constants.deviceId);
            client.onConnectionLost = this.onConnectionLost;
            client.onMessageArrived = this.onMessageArrived;
            client.connect({
                onSuccess: this.onConnect,
                onFailure: this.onFailure,
                useSSL: Config.useSSL,
                reconnect: Config.reconnect,
                cleanSession: Config.cleanSession,
                hosts: [Config.hostA, Config.hostB],
                ports: [parseInt(Config.portA), parseInt(Config.portB)],
                userName: Config.userName,
                password: Config.password,
                timeout: parseInt(Config.timeout),
                keepAliveInterval: parseInt(Config.keepAliveInterval),
            });
            this.setState({ client });
        }
        catch (e) {
            this.consoleLog('Configuration is invalid', JSON.stringify(e));
        }
    }

    // writes message to console array
    consoleLog = (title, message = "") => {
        const consoleDepth = 50;
        this.setState({ console: [new ConsoleMessage(title, message), ...(this.state.console.slice(0, consoleDepth - 1))] });
    }

    //fires when Connection established
    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/+/stats');
        client.subscribe('application/+/node/#', { qos: 1 });

        this.setState({ connected: true });
        this.consoleLog("Connected", JSON.stringify(this.state.currentConfig));
    };

    //called when the connect request has failed or timed out. A single response object parameter is passed to the onFailure callback containing the following fields:
    //      invocationContext as passed in to the onFailure method in the connectOptions.
    //      errorCode a number indicating the nature of the error.
    //      errorMessage text describing the error.
    onFailure = (object) => {
        this.consoleLog(
            "Connection failure",
            `
            ${JSON.stringify(this.state.currentConfig)}
            
            invocationContext: ${JSON.stringify(object.invocationContext)}
            errorCode: ${object.errorCode.toString()}
            errorMessage: ${object.errorMessage}           
            `
        );
    };

    //fires when Connection lost
    onConnectionLost = responseObject => {
        this.setState({ connected: false });
        this.consoleLog("Disconnected", responseObject.errorMessage);
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

            //populating state.nodeDetails object
            /*
            {
                devEUI: "5cca7affff7c707e",
                devName: "Coditioner",
                config: {
                    powerOn: {
                        type: "boolean",
                        name: "Power",
                        units: null,
                        states: ["Off", "On"]
                    }
                },
                control: {
                    powerOn: ["Off", "On"]
                }
            }
            */
            if (message.destinationName.startsWith('application') && message.destinationName.endsWith('details')) {
                var nodeDetailsClone = Object.assign({}, this.state.nodeDetails);
                nodeDetailsClone[payload.devEUI] = payload;
                this.setState({ nodeDetails: nodeDetailsClone });
            }

            this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, message.payloadString);
        }
        catch (e) {
            this.consoleLog(`${message.destinationName} QoS: ${message.qos} `, `can't parse payloadString 
            ${message.payloadString}`);
        }
    };


    /*
    send(topic, payload, qos, retained)
        Send a message to the consumers of the destination in the Message.
    Parameters:
        topic	    string | Paho.MQTT.Message	mandatory The name of the destination to which the message is to be sent. - 
                                                        If it is the only parameter, used as Paho.MQTT.Message object.
        payload	    String | ArrayBuffer	    The message data to be sent.
        qos	        number	                    The Quality of Service used to deliver the message.
                        0 Best effort (default).
                        1 At least once.
                        2 Exactly once.
        retained	Boolean	If true, the message is to be retained by the server and delivered to both current and future subscriptions. If false the server only delivers the message to current subscribers, this is the default for new Messages. A received message has the retained boolean set to true if the message was published with the retained boolean set to true and the subscrption was made after the message has been published.
    */
    sendMessage = (applicationID, devEUI, payload) => {
        payload.clientID = Constants.deviceId;

        const topic = `application/${applicationID}/node/${devEUI}/tx`;

        try {
            if (this.state.client) {
                this.state.client.send(topic, JSON.stringify(payload), 0, false);
                ToastAndroid.showWithGravity(
                    'Message sent',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
            else {
                ToastAndroid.showWithGravity(
                    'Client not connected',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
        }
        catch (e) {
            ToastAndroid.showWithGravity(
                'Message exception',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
    }

    //react lifecycle method
    componentDidMount = async () => {
        await this.connectMQTTClient();
        this.state.timer = setInterval(() => this.calcElapsedTime(), 1000);
    }

    //get Node Elapsed time with NodeID
    getNodeElapsedTime = (nodeID) => {
        if (nodeID in this.state.nodesElapsedTime) {
            return this.state.nodesElapsedTime[nodeID];
        }
        return '';
    }

    //calculation elpsed time from the last message for each Node 
    calcElapsedTime = () => {
        const nodeKeys = Object.keys(this.state.nodes);
        nodeKeys.forEach(nodeID => {
            try {
                const nodeMessageTime = new Date(this.state.nodes[nodeID].rxInfo[0].time);
                const timeDiff = Date.now() - nodeMessageTime.getTime();
                const timeDiffString = timeDiff > 0 ? elapsedTimeToString(timeDiff) : '';
                const newNodesElapsedTime = Object.assign({}, this.state.nodesElapsedTime);
                newNodesElapsedTime[nodeID] = timeDiffString;
                this.setState({ nodesElapsedTime: newNodesElapsedTime });
            }
            catch (e) {

            }
        });
    }

    //react lifecycle method
    render() {
        return (
            <ApplicationContext.Provider value={{
                state: this.state,
                actions: {
                    connectMQTTClient: this.connectMQTTClient,
                    getCurrentConfig: this.getCurrentConfig,
                    saveConfig: this.saveConfig,
                    sendMessage: this.sendMessage,
                    getNodeElapsedTime: this.getNodeElapsedTime,
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

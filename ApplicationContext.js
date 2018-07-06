import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Constants } from 'expo';
import Config from './src/Config';
import ConsoleMessage from './src/ConsoleMessage'

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
        retained	Boolean	If true, the message is to be retained by the server and delivered to both current and future subscriptions. 
                                    If false the server only delivers the message to current subscribers, 
                                    this is the default for new Messages. A received message has the retained 
                                    boolean set to true if the message was published with the retained boolean set to 
                                    true and the subscrption was made after the message has been published.
    ---------------------------------------------------------------------------------------------------------------------------
    payload = 
    {
       "reference": "abcd1234",                  // reference which will be used on ack or error (this can be a random string)
        "confirmed": true,                        // whether the payload must be sent as confirmed data down or not
        "fPort": 10,                              // FPort to use (must be > 0)
        "data": "...."                            // base64 encoded data (plaintext, will be encrypted by LoRa Server)
        "object": {                               // decoded object (when application coded has been configured)
            "temperatureSensor": {"1": 25},       // when providing the 'object', you can omit 'data'
            "humiditySensor": {"1": 32}
        }
    }
    */
    sendMessage = (devEUI, payload) => {
        let message = {
            reference: Constants.deviceId,
            confirmed: true,
            fPort: 1,
            object: payload
        };

        try {
            const applicationID = this.state.nodes[devEUI].applicationID;

            const topic = `application/${applicationID}/node/${devEUI}/tx`;

            if (this.state.client) {
                this.state.client.send(topic, JSON.stringify(message), 0, false);
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

    /*
    {
        "devEUI": "68c63affffa547aa",
        "deviceName": "Elevator",
        "config": {
            "temperature": {
                "type": "number",
                "range": [
                    0,
                    50
                ],
                "name": "Temperature",
                "units": "°C",
                "states": null
            },
            "humidity": {
                "type": "number",
                "range": [
                        20,
                        95
                ],
                "name": "Humidity",
                "units": "%",
                "states": null
            }
        }
    }
    */
    getDeviceName = (devEUI) => {
        let deviceName = '';
        try {
            if (devEUI in this.state.nodeDetails) {
                deviceName = this.state.nodeDetails[devEUI].deviceName;
            }
            else if (devEUI in this.state.nodes) {
                deviceName = this.state.nodes[devEUI].deviceName;
            }
        }
        catch (e) { }
        return deviceName;
    }

    getParameters = (devEUI) => {
        let parameters;
        try {
            if (devEUI in this.state.nodes) {
                parameters = Object.keys(this.state.nodes[devEUI].object);
            }
        }
        catch (e) { }
        return parameters;
    }

    getParameterName = (devEUI, parameter) => {
        let parameterName = parameter;
        try {
            parameterName = this.state.nodeDetails[devEUI].config[parameter].name;
        }
        catch (e) { }
        return parameterName;
    }

    getParameterValue = (devEUI, parameter) => {
        let parameterValue = '';
        try {
            value = this.state.nodes[devEUI].object[parameter];
            try {
                const parameterConfig = this.state.nodeDetails[devEUI].config[parameter];
                switch (parameterConfig.type) {
                    case 'boolean':
                        value = value ? parameterConfig.states[1] : parameterConfig.states[0];
                        break;
                    case 'number':
                        value = value.toString();
                        break;
                }
            }
            catch (e) { }
            parameterValue = value.toString();
        }
        catch (e) { }
        return parameterValue;
    }

    getParameterUnits = (devEUI, parameter) => {
        let parameterUnits;
        try {
            parameterUnits = this.state.nodeDetails[devEUI].config[parameter].units;
        }
        catch (e) { }
        return parameterUnits;
    }

    getNodes = () => {
        let nodes;
        try {
            nodes = Object.keys(this.state.nodes);
        }
        catch (e) { }
        return nodes;
    }

    getNodeObject = (devEUI) => {
        let node = {};
        try {
            node = this.state.nodes[devEUI];
        }
        catch (e) { }
        return node;
    }

    getParameterControlEnabled = (devEUI, parameter) => {
        let enabled = false;
        try {
            if (parameter in this.state.nodeDetails[devEUI].control) {
                enabled = true;
            }
        }
        catch (e) { }
        return enabled;
    }

    getParameterControlStates = (devEUI, parameter) => {
        let controlStates = ['Off', 'On'];
        try {
            controlStates = this.state.nodeDetails[devEUI].control[parameter];
        }
        catch (e) { }
        return controlStates;
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
                    getDeviceName: this.getDeviceName,
                    getParameters: this.getParameters,
                    getParameterName: this.getParameterName,
                    getParameterValue: this.getParameterValue,
                    getParameterUnits: this.getParameterUnits,
                    getNodes: this.getNodes,
                    getNodeObject: this.getNodeObject,
                    getParameterControlEnabled: this.getParameterControlEnabled,
                    getParameterControlStates: this.getParameterControlStates,
                }
            }}>
                {this.props.children}
            </ApplicationContext.Provider >
        )
    }
}

export const Consumer = ApplicationContext.Consumer;
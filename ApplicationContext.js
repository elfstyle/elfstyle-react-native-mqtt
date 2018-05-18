import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';


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

        const client = new Paho.MQTT.Client('10.10.10.215', 8083, 'user1');
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect({
            onSuccess: this.onConnect,
            useSSL: false,
            reconnect: true
        });

        this.state = {
            client,
            connected: false,
            console: []
        };
    }

    // writes message to console array
    consoleLog = (message) => {
        this.setState({ console: [...this.state.console, new ConsoleMessage(message)] });
    }

    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/b827ebfffe688fd7/stats');
        client.subscribe('application/2/node/600194ffff37fdd8/rx');
        client.subscribe('application/2/node/68c63affffa547aa/rx');
        this.setState({ connected: true });
        this.consoleLog("connected");
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
        this.consoleLog(responseObject.errorMessage);
    };

    onMessageArrived = message => {
        this.setState({
            [message.destinationName]: JSON.parse(message.payloadString)
        });
        this.consoleLog(message.destinationName, message.payloadString);
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

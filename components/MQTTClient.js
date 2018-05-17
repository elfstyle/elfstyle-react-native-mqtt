import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Gateway from './Gateway';
import Node from './Node';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});

export default class extends Component {
    constructor(props) {
        super(props);

        const client = new Paho.MQTT.Client('10.10.10.215', 8083, 'user');
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
            destinationName: '',
            payloadString: ''
        };
    }

    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/b827ebfffe688fd7/stats');
        client.subscribe('application/2/node/600194ffff37fdd8/rx');
        client.subscribe('application/2/node/68c63affffa547aa/rx');
        this.setState({ connected: true });
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
    };

    onMessageArrived = message => {
        this.setState({
            destinationName: message.destinationName,
            payloadString: message.payloadString,
            [message.destinationName]: JSON.parse(message.payloadString)
        });
    };

    render() {
        return (
            <View>
                <View style={styles.containerClient}>
                    <Text>-----MQTTClient------ {this.state.connected ? "online" : "offline"}</Text>
                    <Text>destinationName: {this.state.destinationName}</Text>
                    <Text>payloadString: {this.state.payloadString}</Text>
                </View>
                <Gateway payload={this.state['gateway/b827ebfffe688fd7/stats']} />
                <Node payload={this.state['application/2/node/600194ffff37fdd8/rx']} />
                <Node payload={this.state['application/2/node/68c63affffa547aa/rx']} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerClient: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        height: 250
    },
});
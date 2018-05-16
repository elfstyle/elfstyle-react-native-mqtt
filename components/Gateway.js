import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});

export default class Gateway extends Component {
    constructor(props) {
        super(props);

        const client = new Paho.MQTT.Client('10.10.10.215', 8083, 'unique_client_name1');
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect({ onSuccess: this.onConnect, useSSL: false });

        this.state = {
            connected: false,
            text: '',
            payload: {},
            client,
        };
    }

    onConnect = () => {
        const { client } = this.state;
        client.subscribe('gateway/b827ebfffe688fd7/stats');
        this.setState({ connected: true });
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
    };

    onMessageArrived = message => {
        this.setState({ payload: JSON.parse(message.payloadString), text: message.payloadString });
    };

    render() {
        const { text } = this.state;
        const {
            mac,
            time,
            rxPacketsReceived,
            rxPacketsReceivedOK,
            txPacketsReceived,
            txPacketsEmitted
        } = this.state.payload;

        return (
            <View>
                <Text>-----Gateway------</Text>
                <Text>{this.state.connected ? "online" : "offline"}</Text>
                <Text>Gateway Id: {mac}</Text>
                <Text>Time: {time}</Text>
                <Text>rxPacketsReceived: {rxPacketsReceived}</Text>
                <Text>rxPacketsReceivedOK: {rxPacketsReceivedOK}</Text>
                <Text>txPacketsReceived: {txPacketsReceived}</Text>
                <Text>txPacketsEmitted: {txPacketsEmitted}</Text>
                <Text>Last message: {this.state.text}</Text>
            </View>
        );
    }
}
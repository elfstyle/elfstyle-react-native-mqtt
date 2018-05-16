import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import base64 from 'base-64'

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
});

export default class Node extends Component {
    constructor(props) {
        super(props);

        const client = new Paho.MQTT.Client('10.10.10.215', 8083, 'unique_client_name');
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
        client.subscribe('application/2/node/600194ffff37fdd8/rx');
        this.setState({ connected: true });
    };

    onConnectionLost = responseObject => {
        this.setState({ connected: false });
    };

    onMessageArrived = message => {
        this.setState({ payload: JSON.parse(message.payloadString), text: message.payloadString });
    };

    render() {
        const {
            deviceName,
            data
        } = this.state.payload;
        
        const dataDecoded = data? base64.decode(data) : "";       
        
        return (
            <View>
                <Text>-----Node------</Text>
                <Text>{this.state.connected ? "online" : "offline"}</Text>
                <Text>Device Name {deviceName}</Text>
                <Text>Data {dataDecoded}</Text>
                <Text>Last message: {this.state.text}</Text>
            </View>
        );
    }
}

/*
{
    "applicationID": "2",
    "applicationName": "test-app",
    "deviceName": "wemos-d2-otaa",
    "devEUI": "600194ffff37fdd8",
    "txInfo": {
        "frequency": 868500000,
        "dataRate": {
            "modulation": "LORA",
            "bandwidth": 125,
            "spreadFactor": 7
        },
        "adr": true, 
        "codeRate": "4/5"
    },
    "fCnt": 17,
    "fPort": 1,
    "data": "SGVsbG8sIExvUmFwb2xpcyEgVXB0aW1lID0gMTggcGNz"
}

*/
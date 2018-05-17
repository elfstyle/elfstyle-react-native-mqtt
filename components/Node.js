import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import base64 from 'base-64'

export default class extends Component {

    render() {
        let payloadObj = this.props.payload ? this.props.payload : {};

        const {
            deviceName,
            data
        } = payloadObj;

        const dataDecoded = data ? base64.decode(data) : "";

        return (
            <View>
                <Text>-----Node------</Text>
                <Text>Device Name {deviceName}</Text>
                <Text>Data {dataDecoded}</Text>
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
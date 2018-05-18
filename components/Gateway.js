import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

export default class extends Component {

    render() {
        let payloadObj = this.props.payload ? this.props.payload : {};
        const {
            mac,
            time,
            rxPacketsReceived,
            rxPacketsReceivedOK,
            txPacketsReceived,
            txPacketsEmitted
        } = payloadObj;

        return (
            <Card title="Gateway">
                <Text>Gateway Id: {mac}</Text>
                <Text>Time: {time}</Text>
                <Text>rxPacketsReceived: {rxPacketsReceived}</Text>
                <Text>rxPacketsReceivedOK: {rxPacketsReceivedOK}</Text>
                <Text>txPacketsReceived: {txPacketsReceived}</Text>
                <Text>txPacketsEmitted: {txPacketsEmitted}</Text>
            </Card>
        );
    }

}
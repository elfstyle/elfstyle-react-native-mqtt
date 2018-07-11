import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Consumer } from '../ApplicationContext'

export default class extends Component {

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    const gatewayPayload = state.gateways[this.props.gatewayId];
                    return (
                        <Card title="Gateway">
                            <Text>Gateway Id: {gatewayPayload.mac}</Text>
                            <Text>Time: {gatewayPayload.time}</Text>
                            <Text>rxPacketsReceived: {gatewayPayload.rxPacketsReceived}</Text>
                            <Text>rxPacketsReceivedOK: {gatewayPayload.rxPacketsReceivedOK}</Text>
                            <Text>txPacketsReceived: {gatewayPayload.txPacketsReceived}</Text>
                            <Text>txPacketsEmitted: {gatewayPayload.txPacketsEmitted}</Text>
                        </Card>
                    )
                }}
            </Consumer>
        );
    }

}
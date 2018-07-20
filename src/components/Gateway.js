import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Gateway extends Component {
    render() {
        const gatewayObj = this.props.gatewayObj;
        return (
            <Card title={"Gateway: " + gatewayObj.mac}>
                <Text>Time: {gatewayObj.time}</Text>
                <Text>rxPacketsReceived: {gatewayObj.rxPacketsReceived}</Text>
                <Text>rxPacketsReceivedOK: {gatewayObj.rxPacketsReceivedOK}</Text>
                <Text>txPacketsReceived: {gatewayObj.txPacketsReceived}</Text>
                <Text>txPacketsEmitted: {gatewayObj.txPacketsEmitted}</Text>
                <Text>latitude: {gatewayObj.latitude}</Text>
                <Text>longitude: {gatewayObj.longitude}</Text>
                <Text>altitude: {gatewayObj.altitude}</Text>
            </Card>
        )
    }
}

export default Gateway;
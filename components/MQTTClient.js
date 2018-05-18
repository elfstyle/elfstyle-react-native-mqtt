import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Badge, Divider } from 'react-native-elements'

import { Consumer } from '../ApplicationContext'

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    return (
                        <Card title="MQTTClient">
                            <Badge value={state.connected ? "online" : "offline"} />
                        </Card>
                    )
                }}
            </Consumer>
        );
    }
}


/*
                    <Badge value={this.state.connected ? "online" : "offline"} />
                    <Text>destinationName: {this.state.destinationName}</Text>
                    <Divider style={{ backgroundColor: 'lightgrey' }} />
                    <Text>payloadString: {this.state.payloadString}</Text>
*/
const styles = StyleSheet.create({
    containerClient: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        height: 250
    },
});
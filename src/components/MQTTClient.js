import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-elements'

class MQTTClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card title="MQTTClient">
                <Badge
                    value={state.connected ? "online" : "offline"}
                    containerStyle={{ backgroundColor: state.connected ? 'seagreen' : 'firebrick' }}
                />
            </Card>
        )
    }
}

export default MQTTClient;

const styles = StyleSheet.create({
    containerClient: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        height: 250
    },
});
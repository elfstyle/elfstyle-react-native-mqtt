import React, { Component } from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
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
                            <Badge
                                value={state.connected ? "online" : "offline"}
                                containerStyle={{ backgroundColor: state.connected ? 'seagreen' : 'firebrick' }}
                            />
                        </Card>
                    )
                }}
            </Consumer>
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
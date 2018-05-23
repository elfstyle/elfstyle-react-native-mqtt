import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

import MQTTClient from '../components/MQTTClient'

export default class extends React.Component {
    static navigationOptions = {
        title: 'Settings'
    }

    render() {
        return (
            <React.Fragment>
                <Text>Settings</Text>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 5
    }
});

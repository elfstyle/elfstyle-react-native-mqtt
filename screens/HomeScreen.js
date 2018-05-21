import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

import MQTTClient from '../components/MQTTClient'

export default class extends React.Component {
    static navigationOptions = {
        title: 'LoRa Police'
    }

    render() {
        return (
            <React.Fragment>
                <MQTTClient />
                <Button
                    title="MQTT Clients"
                    onPress={() => this.props.navigation.navigate('MQTTClients')}
                    containerStyle={{ marginTop: 10 }}
                />
                <Button
                    title="Gateways"
                    onPress={() => this.props.navigation.navigate('Gateways')}
                    containerStyle={styles.button}
                />
                <Button
                    title="Nodes"
                    onPress={() => this.props.navigation.navigate('Nodes')}
                    containerStyle={styles.button}
                />
                <Button
                    title="Console"
                    onPress={() => this.props.navigation.navigate('Console')}
                    containerStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 5
    }
});

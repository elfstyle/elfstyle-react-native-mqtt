import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

export default class MqttText extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('10.10.10.215', 8083, 'unique_client_name');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({ onSuccess: this.onConnect, useSSL: false });

    this.state = {
      text: ['---'],
      client,
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('gateway/b827ebfffe688fd7/stats');
    this.pushText(`connected`);
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const { text } = this.state;

    return (
      <View>
        <Text>{JSON.stringify(this.state.client)}</Text>
        {text.map(entry => <Text key={entry} >{entry}</Text>)}
      </View>
    );
  }
}
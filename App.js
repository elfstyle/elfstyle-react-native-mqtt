import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MqttText from './components/MqttText'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MQTT application</Text>
        <MqttText node=""/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

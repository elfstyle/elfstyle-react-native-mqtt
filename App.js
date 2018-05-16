import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Gateway from './components/Gateway'
import Node from './components/Node'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MQTT application</Text>
        <Gateway />
        <Node />
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

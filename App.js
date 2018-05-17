import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MQTTClient from './components/MQTTClient'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>MQTT application</Text>
          <MQTTClient />
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25
  },
});

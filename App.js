import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MQTTClient from './components/MQTTClient'
import { Header } from 'react-native-elements'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'LoRaPolice', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <MQTTClient />
      </View>
    );
  }
}


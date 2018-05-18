import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'

//--------components-----------
import MQTTClient from './components/MQTTClient'
import Node from './components/Node'
import Gateway from './components/Gateway'
import Console from './components/Console'

import { Provider } from './ApplicationContext'

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <ScrollView pagingEnabled={true}>         
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'LoRaPolice', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
          <MQTTClient />
          <Console />
        </ScrollView>
      </Provider>
    );
  }
}

/*
        <Gateway payload={this.state['gateway/b827ebfffe688fd7/stats']} />
        <Node payload={this.state['application/2/node/600194ffff37fdd8/rx']} />
        <Node payload={this.state['application/2/node/68c63affffa547aa/rx']} />

*/
import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'

import { Provider } from './ApplicationContext'
import Root from './routes/root'

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <Root />
      </Provider>
    );
  }
}

/*
        <Gateway payload={this.state['gateway/b827ebfffe688fd7/stats']} />
        <Node payload={this.state['application/2/node/600194ffff37fdd8/rx']} />
        <Node payload={this.state['application/2/node/68c63affffa547aa/rx']} />

*/
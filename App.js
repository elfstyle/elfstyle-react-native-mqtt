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

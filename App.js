import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'

import { ApplicationProvider } from './ApplicationContext'
import Root from './routes/root'

export default class App extends React.Component {
  render() {
    return (
      <ApplicationProvider>
        <Root />
      </ApplicationProvider>
    );
  }
}

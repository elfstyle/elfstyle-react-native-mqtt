import React from 'react'
import Console from '../components/Console'
import { Text } from 'react-native'

class ConsoleScreen extends React.Component {
  static navigationOptions = {
    title: 'Console'
  }

  render() {
    return (
      <Console />
    );
  }
}

export default ConsoleScreen;
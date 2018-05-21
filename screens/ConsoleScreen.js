import React from 'react'
import Console from '../components/Console'

export default class extends React.Component {
  static navigationOptions = {
    title: 'Console'
  }

  render() {
    return (
      <Console />
    );
  }
}

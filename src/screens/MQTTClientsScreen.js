import React from 'react'
import MQTTClient from '../components/MQTTClient'



export default class extends React.Component {
  static navigationOptions = {
    title: 'MQTT Clients',
  }

  render() {
    return (
      <React.Fragment>
        <MQTTClient />
      </React.Fragment>
    );
  }
}
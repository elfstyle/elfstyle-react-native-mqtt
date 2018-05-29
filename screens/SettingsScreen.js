import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { Consumer } from '../ApplicationContext'

export default class extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    }

    render() {
        return (
            <Consumer>
                {
                    ({ state }) => {
                        return (
                            <Text>{JSON.stringify(state.currentConfig)}</Text> 
                        )
                    }
                }
            </Consumer>
        );
    }
}

import React from 'react'
import { Text } from 'react-native'
import { Consumer } from '../ApplicationContext'

export default class extends React.Component {
    static navigationOptions = {
        title: 'Gateways'
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    return (
                        <Text>
                            {JSON.stringify(state.gateways)}
                        </Text>
                    )
                }}
            </Consumer>
        );
    }
}

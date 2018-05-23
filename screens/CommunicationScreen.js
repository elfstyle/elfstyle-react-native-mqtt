import React from 'react'
import { Text, FlatList } from 'react-native'
import { Consumer } from '../ApplicationContext'
import Gateway from '../components/Gateway'
import MQTTClient from '../components/MQTTClient'

export default class extends React.Component {
    static navigationOptions = {
        title: 'Communication'
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    const gatewaysArr = Object.keys(state.gateways)
                    return (                       
                        <FlatList
                            data={gatewaysArr}
                            ListHeaderComponent={<MQTTClient />}
                            renderItem={({ item }) => (
                                <Gateway gatewayId={item} />
                            )}
                            keyExtractor={item => item}
                        />
                    )
                }}
            </Consumer>
        );
    }
}

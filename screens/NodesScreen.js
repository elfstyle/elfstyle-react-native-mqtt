import React from 'react'
import { Text, FlatList } from 'react-native'
import { Consumer } from '../ApplicationContext'
import Node from '../components/Node'

export default class extends React.Component {
    static navigationOptions = {
        title: 'Nodes'
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    const nodesArr = Object.keys(state.nodes);
                    return (
                        <FlatList
                            data={nodesArr}
                            renderItem={({ item }) => (
                                <Node nodeId={item}/>
                            )}
                            keyExtractor={item => item}
                        />
                    )
                }}
            </Consumer>
        );
    }
}

import React from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
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
                {({ state, actions }) => {
                    return (
                        <FlatList
                            data={actions.getNodes()}
                            renderItem={({ item }) => (
                                <Node devEUI={item}/>
                            )}
                            keyExtractor={item => item}
                        />
                    )
                }}
            </Consumer>
        );
    }
}

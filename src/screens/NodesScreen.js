import React from 'react'
import { Text, FlatList } from 'react-native'
import { Consumer } from '../ApplicationContext'
import Node from '../components/Node'

class NodesScreen extends React.Component {
    static navigationOptions = {
        title: 'Nodes'
    }

    render() {
        return (
            <Consumer>
                {({ state, actions }) => {
                    return (
                        <Text>NodesScreen</Text>
                        // <FlatList
                        //     data={actions.getNodes()}
                        //     renderItem={({ item }) => (
                        //         <Node devEUI={item}/>
                        //     )}
                        //     keyExtractor={item => item}
                        // />
                    )
                }}
            </Consumer>
        );
    }
}

export default NodesScreen;
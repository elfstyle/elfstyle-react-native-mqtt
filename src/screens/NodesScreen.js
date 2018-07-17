import React from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import Node from '../components/Node'
import nodesLib from '../core/nodesLib'

class NodesScreen extends React.Component {
    static navigationOptions = {
        title: 'Nodes'
    }

    render() {
        const { getNodesDevEUIArray } = nodesLib({ nodes: this.props.nodes });

        return (
            <FlatList
                data={getNodesDevEUIArray()}
                renderItem={({ item }) => (
                    <Node devEUI={item} />
                )}
                keyExtractor={item => item}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
    }
};

export default connect(mapStateToProps, null)(NodesScreen);
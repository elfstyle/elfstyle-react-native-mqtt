import React from 'react'
import { connect } from 'react-redux'
import { Text, FlatList } from 'react-native'
import { Consumer } from '../ApplicationContext'
import Node from '../components/Node'

class NodesScreen extends React.Component {
    static navigationOptions = {
        title: 'Nodes'
    }

    render() {
        const nodes = this.props.nodes;
        const nodesKeyArray = Object.keys(nodes);
        return (
            <FlatList
                data={nodesKeyArray}
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
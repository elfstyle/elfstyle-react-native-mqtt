import React from 'react'
import { connect } from 'react-redux'
import { Text, FlatList } from 'react-native'
import Gateway from '../components/Gateway'
import MQTTClient from '../components/MQTTClient'

class CommunicationScreen extends React.Component {
    static navigationOptions = {
        title: 'Gateways'
    }

    render() {
        const gateways = this.props.gateways;
        const gatewaysKeyArray = Object.keys(gateways);
        return (
            <FlatList
                data={gatewaysKeyArray}
                renderItem={({ item }) => (
                    <Gateway gatewayObj={gateways[item]} />
                )}
                keyExtractor={item => item}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        gateways: state.gateways,
    }
};

export default connect(mapStateToProps, null)(CommunicationScreen);
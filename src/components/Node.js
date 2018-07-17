import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import NodeParameter from './NodeParameter'
import nodesLib from '../core/nodesLib'

class Node extends Component {
    static propTypes = {
        devEUI: PropTypes.string.isRequired,
    }

    render() {       
        const devEUI = this.props.devEUI;

        const { getDeviceName, getParameters } = nodesLib({ nodes: this.props.nodes, nodeDetails: this.props.nodeDetails });
        const nodeElapsedTime = '';//actions.getNodeElapsedTime(devEUI);
        const deviceName = getDeviceName(devEUI);

        const parameters = getParameters(devEUI).map((key) => {
            return (
                <NodeParameter devEUI={devEUI} parameter={key} key={devEUI + key} />
            );
        });

        return (
            <View style={styles.nodeContainer}>
                <View style={styles.nodeHeader}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate(
                                'NodeDetails',
                                {
                                    devEUI: devEUI,
                                    deviceName: deviceName,
                                },
                            );
                        }}
                    >
                        <Text style={styles.nodeTitle}>{deviceName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.nodeElapsedTime}>{nodeElapsedTime}</Text>
                </View>
                <View style={styles.parametersContainer}>
                    {parameters}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        nodeDetails: state.nodeDetails,
    }
};

export default connect(mapStateToProps, null)(withNavigation(Node));

const styles = StyleSheet.create({
    nodeContainer: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        borderRadius: 10,
        elevation: 1,
    },

    nodeHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },

    nodeTitle: {
        fontWeight: 'bold',
        color: 'rgb(26,82,118)',
        fontSize: 20,
    },

    nodeElapsedTime: {
        color: 'gray',
        fontSize: 12,
    },

    parametersContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    parameterContainer: {
        padding: 4,
        margin: 0,
        width: '33.33%',
        maxWidth: 120,
        borderRadius: 4,
    },

    parameterLabel: {
        color: 'darkgrey',
        textAlign: 'center',
        fontSize: 14,
    },

    parameterValue: {
        backgroundColor: 'white',
        margin: 0,
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    }
});
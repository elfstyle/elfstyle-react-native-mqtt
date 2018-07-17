import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import nodesLib from '../core/nodesLib'

class NodeParameter extends Component {
    static propTypes = {
        devEUI: PropTypes.string.isRequired,
        parameter: PropTypes.string.isRequired,
    }

    render() {
        const devEUI = this.props.devEUI;
        const parameter = this.props.parameter;

        const {
            getDeviceName,
            getParameterName, 
            getParameterValue, 
            getParameterUnits, 
        } = nodesLib({ nodes: this.props.nodes, nodeDetails: this.props.nodeDetails });

        const deviceName = getDeviceName(devEUI);
        const parameterName = getParameterName(devEUI, parameter);
        const parameterValue = getParameterValue(devEUI, parameter);
        const parameterUnits = getParameterUnits(devEUI, parameter);

        return (
            <TouchableOpacity
                style={styles.parameterContainer}
                onPress={() => {
                    this.props.navigation.navigate(
                        'NodeParameterDetails',
                        {
                            deviceName: deviceName,
                            parameterName: parameterName,
                            devEUI: devEUI,
                            parameter: parameter,
                        },
                    );
                }}
            >

                <View style={styles.valueContainer}>
                    <Text style={styles.parameterValue}>
                        {parameterValue}
                    </Text>
                    <Text style={styles.parameterUnit}>
                        {parameterUnits}
                    </Text>
                </View>
                <Text style={styles.parameterLabel}>{parameterName}</Text>

            </TouchableOpacity>
        );

    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        nodeDetails: state.nodeDetails,
    }
};

export default connect(mapStateToProps, null)(withNavigation(NodeParameter));

const styles = StyleSheet.create({

    parameterContainer: {
        padding: 4,
        marginLeft: 10,
        marginRight: 10,
        minWidth: 100,
        borderRadius: 4,
    },

    valueContainer: {
        //backgroundColor: "yellow",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end",
    },

    parameterLabel: {
        color: 'darkgrey',
        fontSize: 16,
        textAlign: "center",
    },

    parameterValue: {
        //backgroundColor: "green",
        margin: 0,
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },

    parameterUnit: {
        //backgroundColor: "blue",
        color: 'lightgrey',
        fontSize: 20,
        marginLeft: 3,
        marginBottom: 3,
    }
});
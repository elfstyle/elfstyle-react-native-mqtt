import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Consumer } from '../ApplicationContext'
import { elapsedTimeToString } from '../src/utils'

class NodeParameter extends Component {
    static propTypes = {
        devEUI: PropTypes.string.isRequired,
        parameter: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Consumer>
                {({ state, actions }) => {
                    const devEUI = this.props.devEUI;
                    const parameter = this.props.parameter;

                    const deviceName = actions.getDeviceName(devEUI);
                    const parameterName = actions.getParameterName(devEUI, parameter);
                    const parameterValue = actions.getParameterValue(devEUI, parameter);
                    const parameterUnits = actions.getParameterUnits(devEUI, parameter);

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

                            <Text style={styles.parameterValue}>
                                {parameterValue}
                                <Text style={styles.parameterUnit}>
                                    {parameterUnits}
                                </Text>
                            </Text>

                            <Text style={styles.parameterLabel}>{parameterName}</Text>

                        </TouchableOpacity>
                    );
                }}
            </Consumer>
        );
    }
}

export default withNavigation(NodeParameter);

const styles = StyleSheet.create({

    parameterContainer: {
        padding: 4,
        marginLeft: 10,
        marginRight: 10,
        minWidth: 100,
        borderRadius: 4,
    },

    parameterLabel: {
        color: 'darkgrey',
        textAlign: 'center',
        fontSize: 14,
    },

    parameterValue: {
        margin: 0,
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },

    parameterUnit: {
        color: 'lightgrey',
        fontSize: 14,
    }
});

/*
{
    "applicationID": "2",
    "applicationName": "Climate",
    "deviceName": "Elevator",
    "devEUI": "68c63affffa547aa",
                    "rxInfo": [
                        {
                            "mac": "b827ebfffe688fd7",
                            "time": "2018-05-25T07:25:55.266866Z",
                            "rssi": -41,
                            "loRaSNR": 7.2,
                            "name": "RPi-RAK831-GW",
                            "latitude": 49.9835,
                            "longitude": 36.21126,
                            "altitude": 99
                        }
                    ],
                        "txInfo": {
        "frequency": 868500000,
            "dataRate": {
            "modulation": "LORA",
                "bandwidth": 125,
                    "spreadFactor": 7
        },
        "adr": false,
            "codeRate": "4/5"
    },
    "fCnt": 146,
        "fPort": 1,
            "data": "W1Q9MjYuMDJnci5DXVtIPTUwLjA1JV1bVXQ9NTM5OHNdW0R0PTM3c10=",
                "object": {
        "msg": "[T=26.02gr.C][H=50.05%][Ut=5398s][Dt=37s]"
    }
}
*/
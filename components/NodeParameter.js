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
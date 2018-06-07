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
                {({ state }) => {

                    const nodePayload = state.nodes[this.props.devEUI];
                    const {
                        deviceName,
                        object
                    } = nodePayload;

                    //default values if details are not accessable
                    let name = this.props.parameter;
                    let value = object[this.props.parameter].toString();
                    let units = '';

                    /*
                        {
                            devEUI: "5cca7affff7c707e",
                            devName: "Coditioner",
                            config: {
                                powerOn: {
                                    type: "boolean",
                                    name: "Power",
                                    units: null,
                                    states: ["Off", "On"]
                                }
                            },
                            control: {
                                powerOn: ["Off", "On"]
                            }
                        }
                    */
                    if (this.props.devEUI in state.nodeDetails) {
                        const nodeDetails = state.nodeDetails[this.props.devEUI];
                        if (this.props.parameter in nodeDetails.config) {
                            parameterConfig = nodeDetails.config[this.props.parameter]
                            name = parameterConfig.name;

                        }
                    }

                    const nodeDetails = state.nodeDetails[this.props.devEUI];
                    //const parameterConfig = nodeDetails.config[this.props.parameter];

                    return (
                        <TouchableOpacity
                            style={styles.parameterContainer}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'NodeParameterDetails',
                                    {
                                        deviceName: deviceName,
                                        parameterName: this.props.parameter,
                                        nodeId: this.props.devEUI,
                                    },
                                );
                            }}
                        >
                            <Text style={styles.parameterValue}>{value}</Text>
                            <Text style={styles.parameterLabel}>{name}</Text>
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
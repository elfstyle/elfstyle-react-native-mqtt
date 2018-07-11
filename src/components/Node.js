import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Consumer } from '../ApplicationContext'
import NodeParameter from './NodeParameter'

class Node extends Component {
    static propTypes = {
        devEUI: PropTypes.string.isRequired,
    }
    render() {
        return (
            <Consumer>
                {
                    ({ state, actions }) => {

                        const devEUI = this.props.devEUI;

                        const nodeElapsedTime = actions.getNodeElapsedTime(devEUI);
                        const deviceName = actions.getDeviceName(devEUI);

                        const parameters = actions.getParameters(devEUI).map((key) => {
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
            </Consumer>
        );
    }
}

export default withNavigation(Node);

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
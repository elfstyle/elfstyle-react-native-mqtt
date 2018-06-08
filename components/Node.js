import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Consumer } from '../ApplicationContext'
import { elapsedTimeToString } from '../src/utils'
import NodeParameter from './NodeParameter'

class Node extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elapsedTime: '',
            messageTime: null,
        }
    }

    componentDidMount = () => {
        this.state.timer = setInterval(() => this.calcElapsedTime(), 1000);
    }

    calcElapsedTime = () => {
        if (this.state.messageTime) {
            const timeDiff = Date.now() - this.state.messageTime.getTime();
            const timeDiffString = timeDiff > 0 ? elapsedTimeToString(timeDiff) : '';
            this.setState({
                elapsedTime: timeDiffString,
            });
        }
    }

    componentWillUnmount = () => {
        clearTimeout(this.state.timer);
    }

    render() {
        return (
            <Consumer>
                {
                    ({ state }) => {
                        const nodePayload = state.nodes[this.props.nodeId];
                        const {
                            deviceName,
                            devEUI,
                            rxInfo,
                            object
                        } = nodePayload;

                        if (rxInfo) {
                            this.state.messageTime = new Date(rxInfo[0].time);
                        }
                        const objectKeys = Object.keys(object);

                        const parameters = objectKeys.map((key) => {
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
                                                    deviceName: deviceName,
                                                    nodeId: devEUI,
                                                },
                                            );
                                        }}
                                    >
                                        <Text style={styles.nodeTitle}>{deviceName}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.nodeElapsedTime}>{this.state.elapsedTime}</Text>
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
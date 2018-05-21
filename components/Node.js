import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import base64 from 'base-64';
import { Card } from 'react-native-elements';
import { Consumer } from '../ApplicationContext'

export default class extends Component {

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    const nodePayload = state.nodes[this.props.nodeId];
                    const {
                        deviceName,
                        data
                    } = nodePayload;

                    let dataDecoded = "";

                    try {
                        dataDecoded = base64.decode(data);
                    }
                    catch (e) {
                        dataDecoded = "decoding error";
                    }

                    return (
                        <Card title={deviceName}>
                            <Text>Data {dataDecoded}</Text>
                        </Card>
                    )
                }}
            </Consumer>
        );
    }
}

/*        
    <Card title='Node'>

            </Card>
{
    "applicationID": "2",
    "applicationName": "test-app",
    "deviceName": "wemos-d2-otaa",
    "devEUI": "600194ffff37fdd8",
    "txInfo": {
        "frequency": 868500000,
        "dataRate": {
            "modulation": "LORA",
            "bandwidth": 125,
            "spreadFactor": 7
        },
        "adr": true, 
        "codeRate": "4/5"
    },
    "fCnt": 17,
    "fPort": 1,
    "data": "SGVsbG8sIExvUmFwb2xpcyEgVXB0aW1lID0gMTggcGNz"
}
*/
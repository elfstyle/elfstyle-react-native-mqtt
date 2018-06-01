import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Consumer } from '../ApplicationContext'
import { elapsedTimeToString } from '../src/utils'

export default class extends Component {
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
                {({ state }) => {
                    const nodePayload = state.nodes[this.props.nodeId];
                    const {
                        deviceName,
                        rxInfo,
                        object
                    } = nodePayload;

                    if (rxInfo) {
                        this.state.messageTime = new Date(rxInfo[0].time);
                    }
                    const objectKeys = Object.keys(object);

                    return (
                        <View style={styles.container}>
                            <Text style={styles.containerTitle}>{`${deviceName} (${this.state.elapsedTime})`}</Text>
                            <FlatList
                                horizontal
                                data={objectKeys}
                                renderItem={({ item }) => (
                                    <View style={styles.parameterContainer}>
                                        <Text style={styles.parameterLabel}>{item}</Text>
                                        <Text style={styles.parameterValue}>{object[item].toString()}</Text>
                                    </View>
                                )}
                                keyExtractor={item => item}
                            />
                        </View>
                    )
                }}
            </Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        borderRadius: 10,
    },
    containerTitle: {
        fontWeight: 'bold',
        color: 'rgb(26,82,118)',
        fontSize: 20,
        margin: 10,
    },
    parameterContainer: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        width: 100,
        borderRadius: 4,
    },
    parameterLabel: {
        color: 'darkgrey',
        textAlign: 'center',
        fontSize: 14,
    },
    parameterValue: {
        backgroundColor: 'white',
        margin:0,
        padding: 5,
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    }
});
/*        
{  
   "applicationID":"2",
   "applicationName":"Climate",
   "deviceName":"Elevator",
   "devEUI":"68c63affffa547aa",
   "rxInfo":[  
      {  
         "mac":"b827ebfffe688fd7",
         "time":"2018-05-25T07:25:55.266866Z",
         "rssi":-41,
         "loRaSNR":7.2,
         "name":"RPi-RAK831-GW",
         "latitude":49.9835,
         "longitude":36.21126,
         "altitude":99
      }
   ],
   "txInfo":{  
      "frequency":868500000,
      "dataRate":{  
         "modulation":"LORA",
         "bandwidth":125,
         "spreadFactor":7
      },
      "adr":false,
      "codeRate":"4/5"
   },
   "fCnt":146,
   "fPort":1,
   "data":"W1Q9MjYuMDJnci5DXVtIPTUwLjA1JV1bVXQ9NTM5OHNdW0R0PTM3c10=",
   "object":{  
      "msg":"[T=26.02gr.C][H=50.05%][Ut=5398s][Dt=37s]"
   }
}
*/
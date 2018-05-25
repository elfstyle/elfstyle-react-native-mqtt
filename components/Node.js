import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import base64 from 'base-64';
import { Card } from 'react-native-elements';
import { Consumer } from '../ApplicationContext'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elapsedTime: '',
            now: '',
            messageTime: null,
            count: 0
        }
    }
    componentDidMount = () => {

        this.state.timer = setInterval(() => {
            if (this.state.messageTime) {
                const timeDiff = Date.now() - this.state.messageTime.getTime();
                const timeDiffString = timeDiff > 0 ? this.millisecondsToString(timeDiff) : '';
                this.setState({
                    elapsedTime: timeDiffString,
                });
            }
        },
            1000
        );
    }

    millisecondsToString = (ms) => {
        try {
            const sec = Math.floor(ms / 1000);
            // Calculate the number of days left
            const hours = Math.floor(sec / 3600)
            // After days and hours , how many minutes are left
            const minutes = Math.floor((sec - (hours * 3600)) / 60)
            // Finally how many seconds left after removing days, hours and minutes.
            const secs = Math.floor((sec - (hours * 3600) - (minutes * 60)))

            return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${secs > 9 ? secs : '0' + secs} `;
        }
        catch (e) {
            return `oops`;
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

                    return (
                        <Card title={deviceName}>
                            <Text>Elapsed Time {this.state.elapsedTime}</Text>
                            <Text>Data {object.msg}</Text>
                        </Card>
                    )
                }}
            </Consumer>
        );
    }
}

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
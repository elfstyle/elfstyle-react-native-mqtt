import React from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Consumer } from '../ApplicationContext'
import Node from '../components/Node'
import { Button } from 'react-native-elements';

class NodeParameterDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const deviceName = navigation.getParam('deviceName', '');
        const parameterName = navigation.getParam('parameterName', '');
        return {
            title: `${deviceName}: ${parameterName}`,
        };
    };

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
                {({ state, actions }) => {
                    const nodeId = this.props.navigation.getParam('nodeId', '');
                    const parameterName = this.props.navigation.getParam('parameterName', '');

                    const nodePayload = state.nodes[nodeId];

                    const {
                        applicationID,
                        deviceName,
                        devEUI,
                        rxInfo,
                        object
                    } = nodePayload;

                    const value = object[parameterName].toString();

                    if (rxInfo) {
                        this.state.messageTime = new Date(rxInfo[0].time);
                    }

                    // if object.control.parameterName exists then we can send control messages to device
                    let Control;
                    if ('control' in object)
                        if (parameterName in object.control)
                            Control = (
                                <View style={styles.Container}>
                                    <Button
                                        title="OFF"
                                        onPress={() => {
                                            let messagePayload = {};
                                            messagePayload[parameterName] = false;
                                            actions.sendMessage(applicationID, devEUI, messagePayload);
                                        }}
                                    />
                                    <Button
                                        title="ON"
                                        onPress={() => {
                                            let messagePayload = {};
                                            messagePayload[parameterName] = true;
                                            actions.sendMessage(applicationID, devEUI, messagePayload);
                                        }}
                                    />
                                </View>
                            );

                    return (
                        <React.Fragment>
                            <View style={styles.Container}>
                                <View>
                                    <Text style={styles.elapsedTime}>{this.state.elapsedTime}</Text>
                                </View>
                                <View>
                                    <Text style={styles.value}>{value}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Device name:</Text>
                                    <Text style={styles.description}>{deviceName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Parameter:</Text>
                                    <Text style={styles.description}>{parameterName}</Text>
                                </View>
                            </View>
                            {Control}
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default withNavigation(NodeParameterDetailsScreen);

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        borderRadius: 10,
    },
    elapsedTime: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'right',
        paddingHorizontal: 5,
        height: 20,
    },
    value: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    title: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'right',
        width: '50%',
        padding: 5,
    },
    description: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        padding: 5,
    },

});

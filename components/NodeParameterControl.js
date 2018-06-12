import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Consumer } from '../ApplicationContext'
import { Button } from 'react-native-elements'

class NodeParameterControl extends Component {
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


                    return (

                        <View style={styles.container}>

                            <Button
                                title={actions.getParameterControlStates(devEUI, parameter)[1]}
                                buttonStyle={styles.button}
                                onPress={() => {
                                    let messagePayload = {};
                                    messagePayload[parameter] = true;
                                    actions.sendMessage(devEUI, messagePayload);
                                }}
                            />
                            <Button
                                title={actions.getParameterControlStates(devEUI, parameter)[0]}
                                buttonStyle={styles.button}
                                onPress={() => {
                                    let messagePayload = {};
                                    messagePayload[parameter] = false;
                                    actions.sendMessage(devEUI, messagePayload);
                                }}
                            />

                        </View>

                    );
                }}
            </Consumer>
        );
    }
}

export default NodeParameterControl;

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        borderRadius: 10,
        elevation: 1,
    },
    button: {
        backgroundColor: "rgb(51, 153, 255)",
        margin: 5,
        borderRadius: 10,
        elevation: 1,
    },
});

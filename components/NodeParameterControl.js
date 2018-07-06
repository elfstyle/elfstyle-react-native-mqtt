import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
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
                {({ actions }) => {
                    const devEUI = this.props.devEUI;
                    const parameter = this.props.parameter;

                    const parameterValueRaw = actions.getParameterValueRaw(devEUI, parameter);
                    const parameterControlStates = actions.getParameterControlStates(devEUI, parameter);
                    const buttonTitle = parameterValueRaw ? parameterControlStates[0] : parameterControlStates[1];
                    const buttonAction = () => {
                        let messagePayload = {};
                        messagePayload[parameter] = !parameterValueRaw;
                        actions.sendMessage(devEUI, messagePayload);
                    };

                    return (

                        <View style={styles.container}>
                            <Button
                                title={buttonTitle}
                                buttonStyle={styles.button}
                                onPress={buttonAction}
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

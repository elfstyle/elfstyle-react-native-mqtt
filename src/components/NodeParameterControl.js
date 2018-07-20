import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements'
import nodesLib from '../core/nodesLib'
import { clientSendMessage } from '../actions/client'

class NodeParameterControl extends Component {
    static propTypes = {
        devEUI: PropTypes.string.isRequired,
        parameter: PropTypes.string.isRequired,
    }

    render() {
        const devEUI = this.props.devEUI;
        const parameter = this.props.parameter;

        const {
            getParameterValueRaw,
            getParameterControlStates,
        } = nodesLib({ nodes: this.props.nodes, nodeDetails: this.props.nodeDetails });

        const parameterValueRaw = getParameterValueRaw(devEUI, parameter);
        const parameterControlStates = getParameterControlStates(devEUI, parameter);

        const buttonTitle = parameterValueRaw ? parameterControlStates[0] : parameterControlStates[1];
        const buttonAction = () => {
            let messagePayload = {};
            messagePayload[parameter] = !parameterValueRaw;
            this.props.clientSendMessage(devEUI, messagePayload);
        };

        return (

            <View style={styles.container}>
                <Button
                    title={buttonTitle}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={buttonAction}
                />
            </View>

        );
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        nodeDetails: state.nodeDetails,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clientSendMessage: (devEUI, messagePayload) => dispatch(clientSendMessage(devEUI, messagePayload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeParameterControl);

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
        padding: 5,
        borderRadius: 10,
        elevation: 1,
    },

    buttonText: {
        fontSize: 24,
    }

});

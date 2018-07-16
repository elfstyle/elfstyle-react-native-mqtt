import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import {
    debugLog,
    consoleLog,
    getCurrentConfig,
    connectMQTTClient,
    subscribeMQTT,
} from './core'
import subscriptions from './configs/subscriptions'

const ApplicationContext = React.createContext();

class ApplicationProvider extends Component {

    //react lifecycle method
    componentDidMount = () => {
        debugLog('componentDidMount');
        this.performConnectionProcedure();
        //this.state.timer = setInterval(() => this.calcElapsedTime(), 1000);
    }

    performConnectionProcedure = () => {
        getCurrentConfig()
            .then(config => {
                consoleLog("Connected", JSON.stringify(config));
                return connectMQTTClient(config);
            })
            .then(client => subscribeMQTT(client, subscriptions));
    }

    //get Node Elapsed time with NodeID
    getNodeElapsedTime = (nodeID) => {
        // if (nodeID in this.state.nodesElapsedTime) {
        //     return this.state.nodesElapsedTime[nodeID];
        // }
        // return '';
    }

    getDeviceName = (devEUI) => {
        let deviceName = '';
        try {
            if (devEUI in this.props.nodeDetails) {
                deviceName = this.props.nodeDetails[devEUI].deviceName;
            }
            else if (devEUI in this.props.nodes) {
                deviceName = this.props.nodes[devEUI].deviceName;
            }
        }
        catch (e) { }
        return deviceName;
    }

    getParameters = (devEUI) => {
        let parameters = [];
        try {
            if (devEUI in this.props.nodes) {
                parameters = Object.keys(this.props.nodes[devEUI].object);
            }
        }
        catch (e) { }
        return parameters;
    }

    getParameterName = (devEUI, parameter) => {
        let parameterName = parameter;
        try {
            parameterName = this.props.nodeDetails[devEUI].config[parameter].name;
        }
        catch (e) { }
        return parameterName;
    }

    //returns raw value of the parameter or null if parameter is undefined
    getParameterValueRaw = (devEUI, parameter) => {
        try {
            return this.props.nodes[devEUI].object[parameter];
        }
        catch (e) { }
        return null;
    }

    //returns string representation of the parameter value or empty string if parameter is undefined
    getParameterValue = (devEUI, parameter) => {
        let parameterValue = '';
        try {
            value = this.props.nodes[devEUI].object[parameter];
            try {
                const parameterConfig = this.props.nodeDetails[devEUI].config[parameter];
                switch (parameterConfig.type) {
                    case 'boolean':
                        value = value ? parameterConfig.states[1] : parameterConfig.states[0];
                        break;
                    case 'number':
                        value = value.toString();
                        break;
                }
            }
            catch (e) { }
            parameterValue = value.toString();
        }
        catch (e) { }
        return parameterValue;
    }

    getParameterUnits = (devEUI, parameter) => {
        let parameterUnits;
        try {
            parameterUnits = this.props.nodeDetails[devEUI].config[parameter].units;
        }
        catch (e) { }
        return parameterUnits;
    }

    getNodes = () => {
        let nodes;
        try {
            nodes = Object.keys(this.props.nodes);
        }
        catch (e) { }
        return nodes;
    }

    getNodeObject = (devEUI) => {
        let node = {};
        try {
            node = this.props.nodes[devEUI];
        }
        catch (e) { }
        return node;
    }

    getParameterControlEnabled = (devEUI, parameter) => {
        let enabled = false;
        try {
            if (parameter in this.props.nodeDetails[devEUI].control) {
                enabled = true;
            }
        }
        catch (e) { }
        return enabled;
    }

    getParameterControlStates = (devEUI, parameter) => {
        let controlStates = ['Off', 'On'];
        try {
            controlStates = this.props.nodeDetails[devEUI].control[parameter];
        }
        catch (e) { }
        return controlStates;
    }

    //react lifecycle method
    render() {
        return (
            <ApplicationContext.Provider value={{
                actions: {
                    // connectMQTTClient: this.connectMQTTClient,
                    // getCurrentConfig: this.getCurrentConfig,
                    // saveConfig: this.saveConfig,
                    // sendMessage: this.sendMessage,
                    // getNodeElapsedTime: this.getNodeElapsedTime,
                    getDeviceName: this.getDeviceName,
                    getParameters: this.getParameters,
                    getParameterName: this.getParameterName,
                    getParameterValueRaw: this.getParameterValueRaw,
                    getParameterValue: this.getParameterValue,
                    getParameterUnits: this.getParameterUnits,
                    getNodes: this.getNodes,
                    getNodeObject: this.getNodeObject,
                    getParameterControlEnabled: this.getParameterControlEnabled,
                    getParameterControlStates: this.getParameterControlStates,
                }
            }}>
                {this.props.children}
            </ApplicationContext.Provider >
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        nodeDetails: state.nodeDetails,
    }
};

const ApplicationProviderRedux = connect(mapStateToProps, null)(ApplicationProvider);

const Consumer = ApplicationContext.Consumer;

export { ApplicationProviderRedux, Consumer }
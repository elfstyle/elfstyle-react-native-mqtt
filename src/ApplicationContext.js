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
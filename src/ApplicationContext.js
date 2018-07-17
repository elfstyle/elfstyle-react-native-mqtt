import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import {
    debugLog,
    consoleLog,
    connectMQTTClient,
    subscribeMQTT,
} from './core'
import subscriptions from './configs/subscriptions'
import { configLoad } from './actions/configActions'
import { calcNodesElapsedTime } from './actions/nodesElapsedTimeActions'

const ApplicationContext = React.createContext();

class ApplicationProvider extends Component {

    //react lifecycle method
    componentDidMount = () => {
        debugLog('componentDidMount');
        this.props.configLoad();
        setInterval(() => this.props.calcNodesElapsedTime(), 1000);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.config !== prevProps.config) {
            this.performConnectionProcedure();
        }
    }

    performConnectionProcedure = () => {
        connectMQTTClient(this.props.config)
            .then(client => subscribeMQTT(client, subscriptions));
    }

    //react lifecycle method
    render() {
        return (
            <ApplicationContext.Provider value={{}}>
                {this.props.children}
            </ApplicationContext.Provider >
        )
    }
}

const mapStateToProps = state => {
    return {
        config: state.config,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        configLoad: () => dispatch(configLoad()),
        calcNodesElapsedTime: () => dispatch(calcNodesElapsedTime()),
    }
}

const ApplicationProviderRedux = connect(mapStateToProps, mapDispatchToProps)(ApplicationProvider);

const Consumer = ApplicationContext.Consumer;

export { ApplicationProviderRedux, Consumer }
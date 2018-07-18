import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import {
    debugLog,
    consoleLog,
} from './core'
import { configLoad } from './actions/configActions'
import { calcNodesElapsedTime } from './actions/nodesElapsedTimeActions'
import { clientConnect } from './actions/clientActions'

const ApplicationContext = React.createContext();

class ApplicationProvider extends Component {

    componentDidMount = () => {
        debugLog('componentDidMount');
        this.props.configLoad();
        setInterval(() => this.props.calcNodesElapsedTime(), 1000);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.config !== prevProps.config) {
            this.props.clientConnect();
        }
    }

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
        clientConnect: () => dispatch(clientConnect()),
    }
}

const ApplicationProviderRedux = connect(mapStateToProps, mapDispatchToProps)(ApplicationProvider);

const Consumer = ApplicationContext.Consumer;

export { ApplicationProviderRedux, Consumer }
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import {
    debugLog,
    consoleLog,
} from './core'
import { configLoad } from './actions/config'
import { calcNodesElapsedTime } from './actions/nodesElapsedTime'
import { clientConnect } from './actions/client'

class Application extends Component {

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
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Application);
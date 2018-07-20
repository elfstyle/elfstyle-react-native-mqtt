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
import { clearToast } from './actions/common'

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
        if (this.props.toastMessage !== prevProps.toastMessage) {
            this.props.toastMessage && ToastAndroid.showWithGravity(
                this.props.toastMessage,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            this.props.clearToast();
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
        toastMessage: state.common.toast,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        configLoad: () => dispatch(configLoad()),
        calcNodesElapsedTime: () => dispatch(calcNodesElapsedTime()),
        clientConnect: () => dispatch(clientConnect()),
        clearToast: () => dispatch(clearToast()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
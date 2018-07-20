import { combineReducers } from 'redux'

import clientReducer from './clientReducer'
import configReducer from './configReducer'
import consoleReducer from './consoleReducer'
import gatewaysReducer from './gatewaysReducer'
import nodeDetailsReducer from './nodeDetailsReducer'
import nodesElapsedTime from './nodesElapsedTime'
import nodesReducer from './nodesReducer'

export default combineReducers({
    client: clientReducer,
    config: configReducer,
    console: consoleReducer,
    gateways: gatewaysReducer,
    nodeDetails: nodeDetailsReducer,
    nodesElapsedTime: nodesElapsedTime,
    nodes: nodesReducer,
});
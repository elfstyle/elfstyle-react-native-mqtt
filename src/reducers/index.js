import { combineReducers } from 'redux'

import client from './client'
import common from './common'
import config from './config'
import console from './console'
import gateways from './gateways'
import nodeDetails from './nodeDetails'
import nodesElapsedTime from './nodesElapsedTime'
import nodes from './nodes'

export default combineReducers({
    client,
    common,
    config,
    console,
    gateways,
    nodeDetails,
    nodesElapsedTime,
    nodes,
});
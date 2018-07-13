import store from '../store'
import { NODES_ADD } from '../types'

export function nodesAdd(payload) {
    return {
        type: NODES_ADD,
        payload
    }
}

export function storeNodesAdd(payload) {
    store.dispatch(nodesAdd(payload));
}

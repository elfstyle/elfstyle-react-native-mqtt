import store from '../../store'
import { NODEDETAILS_ADD } from '../types'

export function nodeDetaisAdd(payload) {
    return {
        type: NODEDETAILS_ADD,
        payload
    }
}

export function storeNodeDetailsAdd(payload) {
    store.dispatch(nodeDetaisAdd(payload));
}

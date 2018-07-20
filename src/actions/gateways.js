import store from '../store'
import { GATEWAYS_ADD } from '../types'

export function gatewaysAdd(payload) {
    return {
        type: GATEWAYS_ADD,
        payload
    }
}

export function storeGatewaysAdd(payload) {
    store.dispatch(gatewaysAdd(payload));
}

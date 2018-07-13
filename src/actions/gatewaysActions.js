import { GATEWAYS_ADD } from '../types'

export function gatewaysAdd(payload) {
    return {
        type: GATEWAYS_ADD,
        payload
    }
}

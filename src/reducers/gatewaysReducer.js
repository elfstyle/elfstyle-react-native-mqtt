import { GATEWAYS_ADD } from '../types'

const initialState = {}

export default function (state = initialState, action) {

    switch (action.type) {
        case GATEWAYS_ADD:
            let newState = Object.assign({}, state);
            newState[action.payload.mac] = action.payload;
            return newState;
        default:
            return state;
    }
}

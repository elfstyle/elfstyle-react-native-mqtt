import { NODESELAPSEDTIME_SET } from '../types'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case NODESELAPSEDTIME_SET:
            return action.payload;
        default:
            return state;
    }
}

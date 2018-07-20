import { CONFIG_SET } from '../types'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case CONFIG_SET:
            return action.payload; 
        default:
            return state;
    }
}

import { CONSOLE_ADD_RECORD } from '../types'

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case CONSOLE_ADD_RECORD:
            return [action.payload, ...state];
        default:
            return state;
    }
}

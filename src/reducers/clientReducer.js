import { CLIENT_CLEAR, CLIENT_SET } from '../types'

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case CLIENT_CLEAR:
            return null;
        case CLIENT_SET:
            return action.payload;
        default:
            return state;
    }
}

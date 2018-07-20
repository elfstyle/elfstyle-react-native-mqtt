import {
    COMMON_CONNECTED_SET,
    COMMON_CONNECTED_CLEAR,
    COMMON_TOAST_SET,
} from '../types'

const initialState = {
    connected: false,
    toast: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case COMMON_CONNECTED_SET:
            return {
                ...state,
                connected: true
            };
        case COMMON_CONNECTED_CLEAR:
            return {
                ...state,
                connected: false
            };
        case COMMON_TOAST_SET:
            return {
                ...state,
                toast: action.payload
            };

        default:
            return state;
    }
}

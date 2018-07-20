import {
    COMMON_CONNECTED_SET,
    COMMON_CONNECTED_CLEAR,
} from '../types'

const initialState = {
    connected: false,    
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
        default:
            return state;
    }
}

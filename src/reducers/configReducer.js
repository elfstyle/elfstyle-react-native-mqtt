import { GET_CONFIG, SET_CONFIG } from '../actions/types'

const initialState = {
    hostA: '127.0.0.1',
    portA: '8083',
    hostB: '127.0.0.1',
    portB: '8083',
    userName: '',
    password: '',
    cleanSession: true,
    useSSL: false,
    reconnect: false,
    timeout: '10',
    keepAliveInterval: '60',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG:
            return Object.assign({}, state, action.payload);
            break;
        default:
            return state;
    }
}

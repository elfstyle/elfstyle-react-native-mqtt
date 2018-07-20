import { 
    COMMON_CONNECTED_SET,
    COMMON_CONNECTED_CLEAR,
    COMMON_TOAST_SET,
 } from '../types'

export const setConnected = () => {   
    return {
        type: COMMON_CONNECTED_SET
    }
}

export const setDisconnected = () => {   
    return {
        type: COMMON_CONNECTED_CLEAR
    }
}

export const setToast = (message) => {   
    return {
        type: COMMON_TOAST_SET,
        payload: message
    }
}

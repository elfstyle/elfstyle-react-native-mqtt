import store from '../store'
import {
    COMMON_CONNECTED_SET,
    COMMON_CONNECTED_CLEAR,
    COMMON_TOAST_SET,
    COMMON_TOAST_CLEAR,
} from '../types'

export const setConnected = () => dispatch => {
    dispatch(setToast('Connected'));
    dispatch({
        type: COMMON_CONNECTED_SET
    });
    return;
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

export const clearToast = () => {
    return {
        type: COMMON_TOAST_CLEAR,
    }
}

export const dispatchSetToast = (message) => {
    store.dispatch(setToast(message));
}
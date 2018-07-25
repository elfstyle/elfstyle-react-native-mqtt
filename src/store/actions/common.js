import {
    COMMON_CONNECTED_SET,
    COMMON_CONNECTED_CLEAR,
} from '../types'
import setToast from '../../core/setToast'

export const setConnected = () => dispatch => {
    setToast('Connected');
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
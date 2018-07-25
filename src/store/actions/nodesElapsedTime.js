import { NODESELAPSEDTIME_SET } from '../types'
import { calcElapsedTime } from '../../core'

export const nodesElapsedTimeSet = (object) => {
    return {
        type: NODESELAPSEDTIME_SET,
        payload: object
    }
}

export const calcNodesElapsedTime = () => (dispatch, getState) => {
    const { nodes } = getState();
    const nodesElapsedTime = calcElapsedTime(nodes);
    dispatch(nodesElapsedTimeSet(nodesElapsedTime));
}
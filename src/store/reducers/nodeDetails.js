import { NODEDETAILS_ADD } from '../types'

const initialState = {}

export default function (state = initialState, action) {

    switch (action.type) {
        case NODEDETAILS_ADD:
            let newState = Object.assign({}, state);
            newState[action.payload.devEUI] = action.payload;
            return newState;
        default:
            return state;
    }
}

import { Actions } from '../constants';

const initialState = null;

export default function(state=initialState, action) {
    switch(action.type) {
        case Actions.GET_CHANNEL_SUCCESS:
            return action.payload;
        case Actions.GET_CHANNEL_FAILURE:
            return initialState;
    }
    return state;
}
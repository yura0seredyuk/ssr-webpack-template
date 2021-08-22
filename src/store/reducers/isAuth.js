import { IS_AUTH } from '../types';

const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH:
            return action.payload;

        default:
            return state;
    }
}

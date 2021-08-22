import { IS_LOADING } from '../types';

const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return action.payload;

        default:
            return state;
    }
}

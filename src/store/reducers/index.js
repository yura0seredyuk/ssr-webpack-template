import { combineReducers } from 'redux';

import hello from './helloReducer';
import todos from './todos';
import isAuth from './isAuth';
import userData from './userData';
import isLoading from './isLoading';

export default combineReducers({
    hello,
    todos,
    isAuth,
    userData,
    isLoading
});

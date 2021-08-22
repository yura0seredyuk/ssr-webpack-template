import { combineReducers } from 'redux';

import hello from './helloReducer';
import todos from './todos';
import isAuth from './isAuth';
import userData from './userData';

export default combineReducers({
    hello,
    todos,
    isAuth,
    userData
});

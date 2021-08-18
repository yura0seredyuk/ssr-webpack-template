import { combineReducers } from 'redux';

import hello from './helloReducer';
import todos from './todos';

export default combineReducers({
    hello,
    todos
});

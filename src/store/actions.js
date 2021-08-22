import axios from 'axios';

import { SET_HELLO, FETCH_TODOS, IS_AUTH, USER_DATA, IS_LOADING } from './types';

export const setHello = (payload) => ({
    type: SET_HELLO,
    payload
});

export const fetchTodos = () => async dispatch => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    dispatch({
        type: FETCH_TODOS,
        payload: response.data
    });
};


export const setAuth = (payload) => ({
    type: IS_AUTH,
    payload
});

export const setUser = (payload) => ({
    type: USER_DATA,
    payload
});

export const setLoading = (payload) => ({
    type: IS_LOADING,
    payload
});

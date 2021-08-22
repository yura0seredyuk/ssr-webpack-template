import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AuthService from '../../../../requests/AuthService';
import { setAuth, setUser } from '../../../../store/actions';

function Login({ isAuth, userData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log('Error while login', e);
        }
    };

    const handleRegister = async (email, password) => {
        try {
            const response = await AuthService.registration(email, password);
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(false));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log('Error while register', e);
        }
    }

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(setAuth(false));
            dispatch(setUser({}));
        } catch (e) {
            console.log('Error while logout', e);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}/>
            <button onClick={() => handleLogin(email, password)}>Login</button>
            <button onClick={() => handleRegister(email, password)}>Register</button>
            {console.log(isAuth, userData)}
        </div>
    );
}

const MapStateToProps = state => ({
    isAuth: state.isAuth,
    userData: state.userData
})

export default connect(MapStateToProps)(Login);


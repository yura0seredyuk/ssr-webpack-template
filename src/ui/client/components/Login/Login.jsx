import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AuthService from '../../../../requests/AuthService';
import { setAuth, setLoading, setUser } from '../../../../store/actions';
import axios from 'axios';
import { API_URL } from '../../../../http';
import UserService from '../../../../requests/UserService';

function Login({ isAuth, userData, isLoading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

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
            await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(setAuth(false));
            dispatch(setUser({}));
        } catch (e) {
            console.log('Error while logout', e);
        }
    }

    const checkAuth = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });

            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log('Error while check', e);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log('Error while get users', e);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        }
    }, []);

    return (
        !isLoading ? (
            <div>
                {!isAuth  && <h1>Login</h1>}
                <h3>{isAuth ? `User authorized ${userData.email}` : 'You are not authorized'}</h3>
                <h3>{userData.isActivated ? 'Your account is activated' : 'You should activate account'}</h3>
                {!isAuth && (
                    <>
                        <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email}/>
                        <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}/>
                        <button onClick={() => handleLogin(email, password)}>Login</button>
                        <button onClick={() => handleRegister(email, password)}>Register</button>
                    </>
                )}
                {isAuth && (
                        <>
                            <button onClick={logout}>Log out</button>
                            <br/>
                            <button onClick={getUsers}>Get users</button>


                            {users.map(user => (
                                <div key={user.id}>{user.email}</div>
                            ))}
                        </>
                )}
                {/*{console.log(isAuth, userData)}*/}
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}

const MapStateToProps = state => ({
    isAuth: state.isAuth,
    userData: state.userData,
    isLoading: state.isLoading,
    isActivated: state.isActivated
})

export default connect(MapStateToProps)(Login);


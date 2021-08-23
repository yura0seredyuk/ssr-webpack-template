import React, { useState } from 'react';

const AdminMain = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const admin = {login: 'admin', password: 'admin'};
    const [auth, setAuth] = useState(false);

    const check = (event, login, password) => {
        event.preventDefault();

        if (admin.login === login && admin.password === password) {
            setAuth(true);
        }
    }

    return (
        <div>
            <h1>Admin</h1>
            {!auth ? (
                <form name='login' onSubmit={(event) => check(event, login, password)}>
                    <input type='text' name='login' value={login} onChange={(event) => setLogin(event.target.value)} required/>
                    <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    <input type='submit' value='Log in'/>
                </form>
            ) : (
                <div>Auth</div>
            )}
        </div>
    )
};

export default { component: AdminMain };

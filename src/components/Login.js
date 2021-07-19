import React, { useState, useEffect } from 'react';
import loginService from '../services/login';

const Login = ({ errorMessage, setErrorMessage, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password
            });

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
            setUser(user);
            setUsername('');
            setPassword('');
        } catch {
            setErrorMessage('Wrong Credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <h3>log in to application</h3>
                <p> {errorMessage}</p>
                username &nbsp;
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => {
                        setUsername(target.value);
                    }}
                />
            </div>
            <div>
                password &nbsp;
                <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default Login;

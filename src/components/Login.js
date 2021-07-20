import React, { useState } from 'react';

const Login = ({ errorMessage, handleLogin, username, password, setUsername, setPassword }) => {
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

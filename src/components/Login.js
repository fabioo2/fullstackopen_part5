import React from 'react';
import Message from '../components/Message';

const Login = ({
    message,
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                <h3>log in to application</h3>
                <Message message={message} />
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
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(
            'loggedBlogAppUser'
        );
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch {
            setMessage('Wrong username or password');
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogAppUser');
        setUser(null);
    };

    if (user === null)
        return (
            <div>
                <Login
                    message={message}
                    setMessage={setMessage}
                    setUser={setUser}
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
        );

    return (
        <div>
            <h2>Blog App</h2>

            <p>
                <b>{user.name} is logged in</b>
            </p>
            <button onClick={handleLogout}>log out</button>

            <h3>create new</h3>
            <Create
                setBlogs={setBlogs}
                user={user}
                blogs={blogs}
                message={message}
                setMessage={setMessage}
            />

            <h3>blogs</h3>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;

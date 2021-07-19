import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    });

    const loginForm = () => (
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

    const handleLogout = (event) => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogAppUser');
        setUser(null);
    };

    if (user === null) return loginForm();

    return (
        <div>
            <h2>Blog App</h2>

            <p>
                <b>{user.name} is logged in</b>
            </p>
            <button onClick={handleLogout}>log out</button>

            <h3>create new</h3>

            <h3>blogs</h3>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;

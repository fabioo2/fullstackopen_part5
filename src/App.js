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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });
            console.log(user);
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
        <div>
            <p>{errorMessage}</p>
            <form onSubmit={handleLogin}>
                <div>
                    username &nbsp;
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => {
                            console.log(target.value);
                            setUsername(target.value);
                        }}
                    />
                </div>
                <div>
                    password &nbsp;
                    <input
                        password
                        type="password"
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }
                    />
                </div>
                <button type="submit">login</button>
            </form>

            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;

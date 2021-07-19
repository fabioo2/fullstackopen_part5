import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
    const [blogs, setBlogs] = useState([]);
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

    const handleLogout = (event) => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogAppUser');
        setUser(null);
    };

    if (user === null) return <Login errorMessage={errorMessage} setErrorMessage={setErrorMessage} setUser={setUser} />;

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

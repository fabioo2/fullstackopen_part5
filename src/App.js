import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sortedByLikes = blogs.sort((a, b) => {
                return b.likes - a.likes;
            });
            setBlogs(sortedByLikes);
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const addBlog = (title, url) => {
        blogFormRef.current.toggleVisibility();

        const blogObject = {
            title,
            url,
            author: user.name,
        };

        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog));

                setMessage(`blog titled ${returnedBlog.title} was successfully created`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            })
            .catch((error) => {
                setMessage(`blog was not created. Error: ${error}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
    };

    const addLike = (id, blog) => {
        const blogObject = {
            user: blog.user.id,
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes + 1,
        };
        console.log(blogObject);
        blogService
            .update(id, blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.map((currentBlog) => (currentBlog.id !== returnedBlog.id ? currentBlog : returnedBlog)));
                setMessage('blog was liked.');
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            })
            .catch((error) => {
                setMessage(`blog was not liked. Error: ${error}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
    };

    const deleteBlog = async (id) => {
        const deletedBlog = await blogService.deleteBlog(id);

        if (deletedBlog) {
            const updatedBlogList = blogs.filter((blog) => {
                return blog.id !== id;
            });

            setBlogs(updatedBlogList);
        }
    };

    const blogFormRef = useRef();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (error) {
            setMessage('Wrong username or password');
            setTimeout(() => {
                setMessage('error:', error);
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
            <p>{message}</p>
            <p>
                <b>{user.name} is logged in</b>
            </p>
            <button onClick={handleLogout}>log out</button>

            <h3>create new</h3>
            <Togglable buttonLabel="create blog" ref={blogFormRef}>
                <Create createBlog={addBlog} />
            </Togglable>

            <h3>blogs sorted by likes</h3>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} blogs={blogs} addLike={addLike} deleteBlogItem={deleteBlog} user={user} />
            ))}
        </div>
    );
};

export default App;

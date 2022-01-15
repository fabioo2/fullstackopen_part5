import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';
import Togglable from './components/Togglable';
import Menu from './components/Menu';
import UserList from './components/UserList';
import User from './components/User';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { getUser, setUser } from './reducers/loginReducer';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON !== null) {
            const loggedUser = JSON.parse(loggedUserJSON);
            dispatch(setUser(loggedUser));
            blogService.setToken(loggedUser.token);
        }
    }, [dispatch]);

    const blogs = useSelector((state) => state.blogs);
    const message = useSelector((state) => state.notification);
    const login = useSelector((state) => state.login);
    const users = useSelector((state) => state.users);

    const blogFormRef = useRef();

    const match = useRouteMatch('/users/:id');
    const user = match ? users.find((user) => user.id === match.params.id) : null;

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            dispatch(getUser(username, password));
            dispatch(setNotification('user logged in', 2));
            setUsername('');
            setPassword('');
        } catch (error) {
            dispatch(setNotification('Wrong username or password', 2));
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();

        window.localStorage.removeItem('loggedBlogAppUser');
        dispatch(setUser(null));
    };

    if (login === null)
        return (
            <div>
                <Login
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
            <div>
                <Menu />
            </div>
            <h2>Blog App</h2>
            <p>{message}</p>
            <p>
                <b>{login.name} is logged in</b>
            </p>
            <button id="logout-button" onClick={handleLogout}>
                log out
            </button>

            <Switch>
                <Route path="/users/:id">
                    <User user={user} />
                </Route>
                <Route path="/users">
                    <UserList users={users} />
                </Route>
                <Route path="/">
                    <h3>create new</h3>
                    <Togglable buttonLabel="create blog" ref={blogFormRef}>
                        <Create blogFormRef={blogFormRef} />
                    </Togglable>

                    <h3>blogs sorted by likes</h3>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} login={login} />
                    ))}
                </Route>
            </Switch>
        </div>
    );
};

export default App;

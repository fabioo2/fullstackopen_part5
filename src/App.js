import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import BlogList from './components/BlogList';
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

    const userMatch = useRouteMatch('/users/:id');
    const user = userMatch ? users.find((user) => user.id === userMatch.params.id) : null;

    const blogmatch = useRouteMatch('/blogs/:id');
    const blog = blogmatch ? blogs.find((blog) => blog.id === blogmatch.params.id) : null;

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
            <h2 className="text-3xl font-bold underline">Blog App</h2>
            <p>{message}</p>
            <p>
                <b>{login.name} is logged in</b>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="logout-button" onClick={handleLogout}>
                log out
            </button>

            <Switch>
                <Route path="/users/:id">
                    <User user={user} />
                </Route>
                <Route path="/users">
                    <UserList users={users} />
                </Route>
                <Route path="/blogs/:id">
                    <Blog blog={blog} />
                </Route>
                <Route path="/blogs">
                    <Redirect to="/" />
                </Route>
                <Route path="/">
                    <Togglable buttonLabel="create blog" ref={blogFormRef}>
                        <Create blogFormRef={blogFormRef} />
                    </Togglable>
                    <BlogList blogs={blogs} />
                </Route>
            </Switch>
        </div>
    );
};

export default App;

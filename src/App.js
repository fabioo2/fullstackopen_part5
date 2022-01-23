import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';
import Togglable from './components/Togglable';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import User from './components/User';
import Message from './components/Message';

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
                <Navbar handleLogout={handleLogout} login={login} />
            </div>

            <Message />

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
                    <div className="container mx-auto">
                        <Togglable buttonLabel="create blog" ref={blogFormRef}>
                            <Create blogFormRef={blogFormRef} />
                        </Togglable>

                        <BlogList blogs={blogs} />
                    </div>
                </Route>
            </Switch>
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, login }) => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    const buttonLabel = visible === false ? 'show' : 'hide';

    const showDelete = { display: showDeleteButton ? '' : 'none' };

    if (login.id === blog.user.id) {
        if (showDelete.display === 'none') {
            setShowDeleteButton(true);
        }
    } else if (login.id === blog.user) {
        if (showDelete.display === 'none') {
            setShowDeleteButton(true);
        }
    }

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const addLike = async (id, blog) => {
        const blogObject = {
            user: blog.user.id,
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes + 1,
        };
        try {
            const updatedBlog = await dispatch(likeBlog(id, blogObject));
            dispatch(setNotification(`blog ${updatedBlog.title} was liked`, 2));
        } catch (error) {
            dispatch(setNotification('blog was not liked. error: ', error), 2);
        }
    };

    const updateBlog = () => {
        addLike(blog.id, blog);
    };

    const deleteBlogItem = async () => {
        const confirm = window.confirm(`do you want to delete ${blog.title}`);

        if (confirm) {
            try {
                dispatch(deleteBlog(blog.id));
                dispatch(setNotification(`blog ${blog.title} was deleted`, 2));
            } catch (error) {
                dispatch(setNotification('blog was not liked. error: ', error), 2);
            }
        }
    };

    return (
        <div className="blog">
            <strong> {blog.title}</strong>
            <div style={hideWhenVisible} className="mainContent">
                <button onClick={toggleVisibility} style={{ marginLeft: '5px' }}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {blog.url} <br />
                <span className="likes-label">likes: {blog.likes} </span>
                <button id="like-button" onClick={updateBlog}>
                    like
                </button>{' '}
                <br />
                {blog.author} <br />
                <button id="delete-button" onClick={deleteBlogItem} style={showDelete}>
                    delete
                </button>{' '}
                <button id="show-hide-button" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default Blog;

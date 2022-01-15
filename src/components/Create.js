import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Create = ({ blogFormRef }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    const addBlog = async (event) => {
        event.preventDefault();
        blogFormRef.current.toggleVisibility();

        const blogObject = {
            title,
            url,
            author: user.name,
        };

        const createdBlog = await dispatch(createBlog(blogObject));
        console.log(createdBlog);
        if (createdBlog) {
            dispatch(setNotification(`blog ${createdBlog.title} successfully created`, 3));
        }

        setUrl('');
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={addBlog}>
                <div style={{ marginBottom: '5px' }}>
                    title: &nbsp;
                    <input
                        id="title"
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                    &nbsp; url: &nbsp;
                    <input
                        id="url"
                        value={url}
                        onChange={({ target }) => {
                            setUrl(target.value);
                        }}
                    />
                </div>
                <div style={{ marginBottom: '5px' }}></div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default Create;

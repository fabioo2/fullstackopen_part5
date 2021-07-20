import React, { useState } from 'react';
import blogService from '../services/blogs';

const Create = ({ user, blogs, setBlogs }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();
        console.log('clicking create is working');
        const blogObject = {
            title,
            url,
            author: user.name
        };

        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog));
            setTitle('');
            setUrl('');
        });
    };

    return (
        <div>
            <form onSubmit={addBlog}>
                <div style={{ marginBottom: '5px' }}>
                    title: &nbsp;
                    <input
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                    &nbsp; url: &nbsp;
                    <input
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

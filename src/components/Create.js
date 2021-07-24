import React, { useState } from 'react';
import blogService from '../services/blogs';
import Message from '../components/Message';

const Create = ({ user, blogs, setBlogs, setMessage, message }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        const blogObject = {
            title,
            url,
            author: user.name,
        };

        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog));
                setTitle('');
                setUrl('');

                setMessage(
                    `blog titled ${title} was successfully created`
                );
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

    return (
        <div>
            <Message message={message} />
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

import React, { useState } from 'react';
const Blog = ({ blog, addLike, deleteBlogItem, user }) => {
    console.log(blog);
    const [visible, setVisible] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    const buttonLabel = visible === false ? 'show' : 'hide';

    const showDelete = { display: showDeleteButton ? '' : 'none' };

    if (user.id === blog.user.id) {
        if (showDelete.display === 'none') {
            setShowDeleteButton(true);
        }
    } else if (user.id === blog.user) {
        if (showDelete.display === 'none') {
            setShowDeleteButton(true);
        }
    }

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const updateBlog = () => {
        addLike(blog.id, blog);
    };

    const deleteBlog = () => {
        const confirm = window.confirm(`do you want to delete ${blog.title}`);

        if (confirm) {
            deleteBlogItem(blog.id);
        }
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <strong> {blog.title}</strong>
                <button onClick={toggleVisibility} style={{ marginLeft: '5px' }}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                <strong> {blog.title}</strong> <br />
                {blog.url} <br />
                likes: {blog.likes} <button onClick={updateBlog}>like</button> <br />
                {blog.author} <br />
                <button onClick={deleteBlog} style={showDelete}>
                    delete
                </button>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
        </div>
    );
};

export default Blog;

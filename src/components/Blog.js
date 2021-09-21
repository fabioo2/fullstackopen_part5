import React, { useState } from 'react';

const Blog = React.forwardRef(({ blog }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    const buttonLabel = visible === false ? 'show' : 'hide';

    const toggleVisibility = () => {
        setVisible(!visible);
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
                likes: {blog.likes} <button>like</button> <br />
                {blog.author} <br />
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
        </div>
    );
});

export default Blog;

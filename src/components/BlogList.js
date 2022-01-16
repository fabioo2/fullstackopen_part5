import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;

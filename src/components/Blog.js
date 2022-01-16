import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';

const Blog = ({ blog }) => {
    if (!blog) {
        return null;
    }
    const newComment = useField('text');

    const dispatch = useDispatch();

    const addLike = async (id, blog) => {
        const blogObject = {
            user: blog.user.id,
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes + 1,
            comments: [...blog.comments],
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

    const handleAddComment = async () => {
        const blogObject = {
            user: blog.user.id,
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes,
            comments: [...blog.comments, { comment: newComment.value }],
        };
        try {
            const updatedBlog = await dispatch(likeBlog(blog.id, blogObject));
            dispatch(setNotification(`blog ${updatedBlog.title} was liked`, 2));
        } catch (error) {
            dispatch(setNotification('blog was not liked. error: ', error), 2);
        }
    };
    // must use () not {}
    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={`${blog.url}`}>{blog.url}</a>
            <p>
                {blog.likes} <button onClick={updateBlog}>like</button>
            </p>
            <p>added by {blog.author}</p>
            <h3>comments</h3>
            <form onSubmit={handleAddComment}>
                <div>
                    <input {...newComment} /> <button>add comment</button>
                </div>
            </form>

            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment._id}>{comment.comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;

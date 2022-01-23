import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';
import { ChatIcon } from '@heroicons/react/solid';
import { ThumbUpIcon } from '@heroicons/react/solid';
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
    const updateBlogComment = (event) => {
        event.preventDefault();

        handleAddComment(blog.id, blog);
    };

    const handleAddComment = async (id, blog) => {
        const blogObject = {
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes,
            comments: [...blog.comments, { comment: newComment.value }],
        };
        console.log(blogObject.comments);
        try {
            const updatedBlog = await dispatch(likeBlog(id, blogObject));
            dispatch(setNotification(`blog ${updatedBlog.title} was commented`, 4));
        } catch (error) {
            dispatch(setNotification('blog was not liked. error: ', error), 2);
        }
    };
    // must use () not {}
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{blog.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{blog.author}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Link to Blog</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">https://{blog.url}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Likes: </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {blog.likes}{' '}
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                onClick={updateBlog}
                            >
                                <ThumbUpIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </button>
                        </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Comments</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {blog.comments.map((comment) => (
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-start text-sm" key={comment._id}>
                                        <ChatIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" aria-hidden="true" />
                                        {comment.comment}
                                    </li>
                                ))}
                            </ul>
                            <input
                                {...newComment}
                                className=" mt-3 rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                            />
                            <button
                                onClick={updateBlogComment}
                                className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Post Comment
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Blog;

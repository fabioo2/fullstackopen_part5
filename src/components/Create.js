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
            <>
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Create a blog</h3>
                                <p className="mt-1 text-sm text-gray-600">Enter the details for the new blog post</p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={addBlog}>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                    Link
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                        http://
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="company-website"
                                                        id="company-website"
                                                        value={url}
                                                        onChange={({ target }) => {
                                                            setUrl(target.value);
                                                        }}
                                                        className="pl-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                        placeholder="www.example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                Content
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="title"
                                                    value={title}
                                                    onChange={({ target }) => {
                                                        setTitle(target.value);
                                                    }}
                                                    rows={3}
                                                    className="shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                                    placeholder="This is my blog post.."
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">Enter your blog post here</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>
            </>
        </div>
    );
};

export default Create;

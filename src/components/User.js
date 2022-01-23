import React from 'react';

const User = ({ user }) => {
    if (!user) {
        return null;
    }
    console.log(user);
    return (
        <div className="m-5 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{user.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">List of blogs created</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Blogs</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="list-disc">
                                {user.blogs.map((blog) => (
                                    <li key={blog.id}>{blog.title}</li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default User;

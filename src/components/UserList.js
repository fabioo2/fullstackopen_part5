import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    return (
        <div className="m-5 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 justify-center align-center">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex justify-center">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg md:w-1/2">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Blogs Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <Link to={`/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                        {user.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.blogs.length}</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;

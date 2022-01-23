import React from 'react';
import { useSelector } from 'react-redux';

const Message = () => {
    const message = useSelector((state) => state.notification);
    if (!message) {
        return null;
    }

    return (
        <p className="m-4 p-4 border-solid rounded border-2 border-indigo-600 bg-indigo-300" role="alert">
            {message}
        </p>
    );
};

export default Message;

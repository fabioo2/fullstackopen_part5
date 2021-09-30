import React from 'react';
const Message = ({ message }) => (
    <div>
        <p style={{ marginBottom: '10px' }}>
            <b>{message}</b>
        </p>
    </div>
);

export default Message;

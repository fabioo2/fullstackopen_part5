import React from 'react';
const Message = ({ message }) => (
    <div>
        <p id="message" style={{ marginBottom: '10px', color: 'red' }}>
            <b>{message}</b>
        </p>
    </div>
);

export default Message;

import React from 'react';
import { Link } from 'react-router-dom';

const padding = {
    paddingRight: 15,
};

const Menu = () => {
    return (
        <div>
            <Link to="/users" style={padding}>
                users
            </Link>
        </div>
    );
};

export default Menu;

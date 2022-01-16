import React from 'react';
import { Link } from 'react-router-dom';

const padding = {
    paddingRight: 15,
};

const Menu = () => {
    return (
        <div>
            <Link to="/" style={padding}>
                home
            </Link>
            <Link to="/users" style={padding}>
                users
            </Link>
        </div>
    );
};

export default Menu;

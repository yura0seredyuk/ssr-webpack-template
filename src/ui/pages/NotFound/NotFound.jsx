import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1>NotFound</h1>
        <Link to={'/'}>Home</Link>
    </div>
);

export default { component: NotFound };

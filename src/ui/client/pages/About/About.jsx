import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
    <div>
        <h1>About</h1>
        <Link to={'/'}>Home</Link>
    </div>
);

export default { component: About };

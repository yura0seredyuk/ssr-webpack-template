import Home from './Home/Home.jsx';
import About from './About/About.jsx';
import NotFound from './NotFound/NotFound.jsx';
import App from '../../App.jsx';

export default [
    {
        component: App,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            },
            {
                component: About,
                path: '/about'
            },
            {
                component: NotFound
            },
        ]
    }
]

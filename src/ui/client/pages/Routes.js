import Home from './Home/Home.jsx';
import About from './About/About.jsx';
import NotFound from './NotFound/NotFound.jsx';
import App from '../../../App.jsx';
import ToDos from './ToDos/ToDos.jsx';
import AdminMain from '../../admin/pages/AdminMain/AdminMain';

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: '/',
                exact: true
            },
            {
                ...About,
                path: '/about'
            },
            {
                ...ToDos,
                path: '/todos'
            },
            {
                ...AdminMain,
                path: '/admin'
            },
            {
                ...NotFound
            },
        ]
    }
]

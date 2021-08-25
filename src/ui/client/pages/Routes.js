import Home from './Home/Home';
import About from './About/About';
import NotFound from './NotFound/NotFound';
import App from '../../../App';
import ToDos from './ToDos/ToDos';
import AdminMain from '../../admin/pages/AdminMain/AdminMain';
import UserPage from './UserPage/UserPage';

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
                ...UserPage,
                path: '/user'
            },
            {
                ...NotFound
            },
        ]
    }
]

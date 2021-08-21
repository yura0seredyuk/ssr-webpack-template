import React from 'react';
import { renderRoutes } from 'react-router-config';
import LanguageToggle from './ui/client/components/LanguageToggle/LanguageToggle';

const App = ({ route }) => (
    <div>
        <LanguageToggle/>
        {renderRoutes(route.routes)}
    </div>
);

App.defaultProps = {
    route: null
}

export default { component: App };

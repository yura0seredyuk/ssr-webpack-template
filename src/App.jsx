import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import styles from './App.module.scss';
import LanguageToggle from './ui/client/components/LanguageToggle/LanguageToggle';
import Header from './ui/client/components/Header/Header';
import Footer from './ui/client/components/Footer/Footer';

const App = ({ route }) => {
    return (
        <div>
            <Header/>
            <LanguageToggle/>
            <div className={styles.root}>
                {renderRoutes(route.routes)}
            </div>
            <Footer/>
        </div>
    )
};

App.defaultProps = {
    route: null
}

export default { component: App };

App.propTypes = {
    route: PropTypes.shape({ routes: PropTypes.shape({}) })
}

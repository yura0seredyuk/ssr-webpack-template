import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from './ui/pages/Routes.js';
import '@babel/polyfill';

import './styles.scss';

const rootElement = document.querySelector('#root');

if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<Provider store={store}>
        <BrowserRouter>
            <div>
                {renderRoutes(Routes)}
            </div>
        </BrowserRouter>
    </Provider>, document.querySelector('#root'));
} else {
    ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                {renderRoutes(Routes)}
            </div>
        </BrowserRouter>
    </Provider>, document.querySelector('#root'));
}

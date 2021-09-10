import 'regenerator-runtime/runtime'
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
const cors = require('cors');
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import '@babel/polyfill';

import Routes from './ui/client/pages/Routes';
import { store } from './store';
import { assetsByChunkName } from '../dist/public/stats.json';
import bodyParser from 'body-parser';
const errorMiddleware = require('./middleware/error-middleware');

const router = require('./router/index');

const app = express();

app.use(bodyParser.json());
app.use(cookiesParser());
app.use(cors({
    credentials: true,
    origin: process.env.PROD_CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

app.use(express.static('dist/public'));


const renderer = (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>
                    {renderRoutes(Routes)}
                </div>
            </StaticRouter>
        </Provider>
    );

    return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" type="text/css" href="/${assetsByChunkName.main[0]}"/>
      <link rel="icon" href="./public/favicon.ico" type="image/ico">
      <title>React app</title>
    </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
        /</g,
        '\\u003c'
        )}
        </script>
        <script src="/${assetsByChunkName.main[1]}"></script>
      </body>
    </html>`
};

app.get('*', (req, res) => {
    const params = req.params[0].split('/');
    const id = params[2];

    const routes = matchRoutes(Routes, req.path);

    const promises = routes
        .map(({ route }) => {
            return route.loadData ? route.loadData(store, id) : null;
        })
        .map(promise => {
            if(promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
            return null;
        });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.notFound) {
            res.status(404);
        }

        res.send(content);
    })
});

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.log('Err, could not connect to the database.');
            } else {
                console.log('Connected to the database.');
            }
        })
        app.listen(PORT, () => {
            console.log('mode:', process.env.NODE_ENV === 'production' ? 'production' : 'development');
            console.log(`Server starts on port ${PORT}`);
        });
    } catch (e) {
        console.log('Error in server', e);
    }
};

start();


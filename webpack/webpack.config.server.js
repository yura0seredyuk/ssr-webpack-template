const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig,{
    mode: 'production',
    target: 'node',
    entry: './src/server.js',
    externals: [nodeExternals()],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: 'null-loader'
            }
        ]
    }
});

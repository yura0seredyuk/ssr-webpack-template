const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig,{
    mode: 'development',
    entry: './src/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/'
    },
    module: {
      rules: [
          {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'sass-loader']
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../favicon.ico'), to: path.resolve(__dirname, '../public') },
            ],
        }),
    ],
    devServer: {
        contentBase: './public',
        hot: true,
        port: 3001,
        open: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map'
});

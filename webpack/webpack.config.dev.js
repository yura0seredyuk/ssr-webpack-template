const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: {
            auto: true,
            // localIdentName: '[name]_[local]_[hash:base64:5]',
        },
        importLoaders: 2,
        sourceMap: false,
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: 'global',
        importLoaders: 2,
        sourceMap: false,
    }
}

const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: false,
    }
}

module.exports = merge(baseConfig,{
    mode: 'development',
    entry: './src/Client.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/'
    },
    module: {
      rules: [
          {
              test: /\.(sa|sc|c)ss$/,
              exclude: /\.module\.(sa|sc|c)ss$/,
              use: ['style-loader', CSSLoader, 'sass-loader']
          },
          {
              test: /\.module\.(sa|sc|c)ss$/,
              use: ['style-loader', CSSModuleLoader, 'sass-loader']
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

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: {
            auto: true,
            localIdentName: '[name]_[local]_[hash:base64:5]',
        },
        importLoaders: 2,
        sourceMap: false,
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: "global",
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
    mode: 'production',
    entry: './src/Client.jsx',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: ['style-loader', CSSLoader, "sass-loader"] // MiniCssExtractPlugin.loader
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: ['style-loader', CSSModuleLoader, "sass-loader"] // MiniCssExtractPlugin.loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../favicon.ico'), to: path.resolve(__dirname, '../dist') },
            ],
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'styles.[chunkhash].css'
        // })
    ],
    devtool: 'inline-source-map'
});

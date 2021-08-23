const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");

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
    entry: './src/client.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, '../dist/public'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, CSSLoader, "sass-loader"]
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, CSSModuleLoader, "sass-loader"]
            }
        ]
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new StatsWriterPlugin({
           stats: {
               all: false,
               assets: true
           }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css',
            chunkFilename: "[id].css"
        })
    ],
    devtool: 'inline-source-map'
});

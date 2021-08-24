const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
}

const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: false,
    }
}

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
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
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
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../favicon.ico'), to: path.resolve(__dirname, '../dist/public') },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css',
            chunkFilename: "[id].css"
        })
    ],
});

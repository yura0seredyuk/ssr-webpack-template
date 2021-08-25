const path = require('path');

const isDev = process.env.NODE_ENV !== 'production'

const loaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-react',
                    ['@babel/env', { targets: { browsers: ['last 7 versions'] } }]
                ]
            }
        },
    ];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

module.exports = {
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: loaders()
            },
            {
                test: /\.(?:ico|png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name]__[hash].[ext]', // [name].[ext]
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'], // add other
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
};

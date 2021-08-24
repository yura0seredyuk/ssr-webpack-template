const path = require('path');

module.exports = {
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-react',
                            ['@babel/env', { targets: { browsers: ['last 7 versions'] } }]
                        ]
                    }
                }
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
    },
};

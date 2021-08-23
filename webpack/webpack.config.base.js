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
                type: 'asset/resource', // or asset
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)/,
                type: 'asset/inline',
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'], // add other
    },
};

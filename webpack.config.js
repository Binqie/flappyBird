const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
        extensions: ['.js', '.png', '.css', '.ttf'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@img': path.resolve(__dirname, 'src/assets/img'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@components': path.resolve(__dirname, 'src/components'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ]
    }
}
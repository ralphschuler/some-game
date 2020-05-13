const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './source/index.js',
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: ['worker-loader', 'babel-loader']
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: ['url-loader'],
            },
            {
                test: /\.(glsl)$/,
                use: ['raw-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: path.resolve(__dirname + '/../build'),
        publicPath: '/',
        filename: 'index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname + '/../source/index.html')
        })
    ],
    devServer: {
        contentBase: './build'
    }
};
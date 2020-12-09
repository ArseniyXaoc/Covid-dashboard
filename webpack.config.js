const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4200,
        index: 'index.html',
        hot: true,
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Covid Dashboard',
        template: './src/index.html',
        filename: './index.html'
        }),],

    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
}

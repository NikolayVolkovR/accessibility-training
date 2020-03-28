const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'js/'),
    },
    devServer: {
        contentBase: '.',
        hot: true,
    }
};
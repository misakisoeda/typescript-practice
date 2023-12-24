const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/library.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: { //importで拡張子がなかった時に自動で解決してくれる
        extensions: ['.ts', '.js']
    }
}

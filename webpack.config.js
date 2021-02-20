const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');


module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /tests/
                ],
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: [ 'buffer', 'Buffer' ],
        }),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        fallback: {
            "util": require.resolve('util'),
            "http": require.resolve('http-browserify'),
            "https": require.resolve('https-browserify'),
            "stream": require.resolve('stream-browserify'),
            "url": require.resolve('url')
        },
        alias: {
            'js-yaml': false
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};

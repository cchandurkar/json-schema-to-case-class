const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/index.ts'],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({analyzerMode: 'disabled', generateStatsFile: true}),
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
            'js-yaml': false // Ignore this import for now as we aren't supporting YAML schemas yet.
        }
    },
    output: {
        filename: 'js2cc.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};

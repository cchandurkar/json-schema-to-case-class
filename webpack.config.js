const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'development',
    externals: [
        /js-yaml/   // Ignore this dependency as we are not supporting YAML parsing as of now.
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /tests/
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            'buffer': false,
            'util': false,
            'http': require.resolve('http-browserify'),
            'https': require.resolve('https-browserify'),
            'stream': require.resolve('stream-browserify'),
        },
    },
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin() ]
    }
};

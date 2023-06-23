const path = require('path')
const WebpackCommon = require("./webpack.common")
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(WebpackCommon, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', //use contentHash to avoid cashing issues
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'postcss-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    });
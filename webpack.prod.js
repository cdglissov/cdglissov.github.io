const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WebpackCommon = require("./webpack.common")
const WebpackMerge = require("webpack-merge")

module.exports = WebpackMerge.merge(WebpackCommon, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //use contentHash to avoid cashing issues
        assetModuleFilename: 'assets/[name][ext]',
        clean: true,
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), new TerserPlugin()
        ]
    },
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //style-loader was here TODO: fix asset size exceeds recommended limit
                    'css-loader', 
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        //use css instead of js
        new MiniCssExtractPlugin({filename: "[name].css"})
        ]
    });
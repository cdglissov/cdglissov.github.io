const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js'),
        toc: path.resolve(__dirname, 'src/js/index_toc.js')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                } 
            }
        ]
    },
    plugins: [
        // autogenerate html files to adapt to bundles
        new HtmlWebpackPlugin({
            title: 'home',
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: 'blog',
            filename: 'tableofcontents.html',
            template: 'src/tableofcontents.html',
            chunks: ['toc']
        }),
        ]
    }
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/typescript/script.ts'),
    output: {
        filename: 'js/[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/[contenthash].min.css'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },

            // TS
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader'
                ]
            },

            // SCSS
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],

            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images/'
                    }
                }]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    }
}
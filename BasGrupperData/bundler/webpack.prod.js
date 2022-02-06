const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
    commonConfiguration, {
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin()
        ],

        output: {
            filename: 'js/[contenthash].min.js',
            path: path.resolve(__dirname, '../dist'),
            clean: true,
        },
    }
)
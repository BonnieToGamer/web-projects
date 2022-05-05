const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

const port = portFinderSync.getPort(8080)
const useHttps = false
const https = useHttps ? 's' : ''
const localIp = ip.v4.sync()
const domain1 = `http${https}://${localIp}:${port}`
const domain2 = `http${https}://localhost:${port}`

module.exports = merge(
    commonConfiguration, {
        mode: 'development',
        plugins: [new CleanTerminalPlugin({
            message: `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`,
        })],
        devServer: {
            host: '0.0.0.0',
            port: port,
            contentBase: './dist',
            watchContentBase: true,
            open: false,
            https: useHttps,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            noInfo: true,
        }
    }
)
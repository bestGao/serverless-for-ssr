const merge = require('webpack-merge')
const baseConf = require('./client.config.base')
const plugins = require('../shared/plugins')

const prodConf = {
    mode: 'production',
    devtool: 'source-map',
    plugins: plugins.clientProd
}

module.exports = merge(baseConf, prodConf)

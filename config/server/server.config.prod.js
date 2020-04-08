const merge = require('webpack-merge')
const baseConf = require('./server.config.base')
const plugins = require('../shared/plugins')

const prodConf = {
    mode: 'production',
    devtool: 'source-map',
    plugins: plugins.server
}

module.exports = merge(baseConf, prodConf)

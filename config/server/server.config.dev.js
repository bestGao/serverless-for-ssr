const merge = require('webpack-merge')
const baseConf = require('./server.config.base')
const plugins = require('../shared/plugins')

const devConf = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  plugins: plugins.server,
}

module.exports = merge(baseConf, devConf)

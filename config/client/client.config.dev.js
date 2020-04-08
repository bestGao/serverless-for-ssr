const merge = require('webpack-merge')
const baseConf = require('./client.config.base')
const plugins = require('../shared/plugins')

const devConf = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  plugins: plugins.clientDev,
  devServer: {
    hot: true,
    stats: 'errors-only'
  }
}

module.exports = merge(baseConf, devConf)

const nodeExternals = require('webpack-node-externals');
const loader = require('../shared/loaders')
const misc = require('../shared/misc')
const paths = require('../shared/paths')

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    app: paths.server.entry,
  },
  output: {
    path: paths.server.build,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: loader.server
  },
  resolve: misc.serverResolve,
  externals: [
    nodeExternals({
      whitelist: [
        /\.(css|less)$/,
        /^antd/ //为了保证import css能在服务端正常
      ],
    })
  ],
  stats: {
    assets: true,
    chunks: true,
    colors: true,
    cached: false,
    cachedAssets: false,
    chunkModules: false,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
}

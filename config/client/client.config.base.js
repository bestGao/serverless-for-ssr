const loader = require('../shared/loaders')
const misc = require('../shared/misc')
const paths = require('../shared/paths')

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    app: paths.client.entry
  },
  output: {
    path: paths.client.build,
    filename: process.env.NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[hash:8].js',
    chunkFilename: process.env.NODE_ENV === 'development' ? 'js/[name].chunk.js' : 'js/[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: loader.client
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
        }
      },
    }
  },
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
  resolve: misc.clientResolve
}

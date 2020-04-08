const Webpack = require('webpack')
const compileAsync = require('./util').compileAsync
const normalizeSlash = require('./util').normalizeSlash
const clientConfig = require('../config/client/client.config.prod')
const serverConfig = require('../config/server/server.config.prod')
const logger = require('../config/utils').logger

normalizeSlash(clientConfig)
normalizeSlash(serverConfig)

const multiCompiler = Webpack([clientConfig, serverConfig])
const clientCompiler = multiCompiler.compilers.find(c => c.name === 'client')
const serverCompiler = multiCompiler.compilers.find(c => c.name === 'server')
const clientCompilerPromise = compileAsync('client', clientCompiler)
const serverCompilerPromise = compileAsync('server', serverCompiler)

const serverConfigWatchOptions = {
  ignored: /node_modules/,
  stats: serverConfig.stats,
}

clientCompiler.watch({}, (error, stats) => {
  if (error || stats.hasErrors()) {
    logger.logError(`client compiled failed: ${error.message}`)
  }
});
serverCompiler.watch(serverConfigWatchOptions, (err, stat) => {
  if (err) {
    logger.logError(err.message)
    logger.logError(err.stack)
  }

  if (stat.hasErrors()) {
    logger.logError(stat.toJson().errors)
  }
})

clientCompilerPromise
  .then(() => serverCompilerPromise)
  .then(() => {
    logger.logSuccess('\n🍾 all compiling done \n')
    process.exit()
  })
  .catch(err => {
    logger.logError(err.message)
  })

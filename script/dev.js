const Path = require('path')
const Webpack = require('webpack')
const Express = require('express')
const nodemon = require('nodemon')
const rm = require('rimraf')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const clientConfig = require('../config/client/client.config.dev')
const serverConfig = require('../config/server/server.config.dev')
const compileAsync = require('./util').compileAsync
const normalizeSlash = require('./util').normalizeSlash
const paths = require('../config/shared/paths')
const logger = require('../config/utils').logger
const env = require('../config/shared/env')

const DEV_SERVER_PORT = 8824

clientConfig.entry.app = [`webpack-hot-middleware/client?path=http://localhost:${DEV_SERVER_PORT}/__webpack_hmr`, clientConfig.entry.app]

normalizeSlash(clientConfig)
normalizeSlash(serverConfig)

if (process.env.NODE_ENV === 'development') {
  rm.sync(paths.client.build)
  rm.sync(paths.server.build)
  rm.sync(paths.shared.assets)
}

const app = Express()
const multiCompiler = Webpack([serverConfig, clientConfig])
const clientCompiler = multiCompiler.compilers.find(c => c.name === 'client')
const serverCompiler = multiCompiler.compilers.find(c => c.name === 'server')
const clientCompilerPromise = compileAsync('client', clientCompiler)
const serverCompilerPromise = compileAsync('server', serverCompiler)

app.use(WebpackDevMiddleware(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  logLevel: 'warn',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}))
app.use(WebpackHotMiddleware(clientCompiler))

const serverConfigWatchOptions = {
  ignored: /node_modules/,
  stats: 'errors-only',
}

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
    logger.logInfo(`[open browser]   http://localhost:8825${env.pagePrefix}`)
    logger.logInfo(`[api enviroment] ${env.host}${env.apiPrefix}`)

    //启动SSR，并监听dist/server目录文件修改
    const script = nodemon({
      script: Path.join(paths.server.build, 'app.js'),
      ignore: ['src/', 'script/', 'node_modules/', 'config/', './*.*', 'dist/assets/', 'typings/'],
    })

    script.on('restart', () => {
      logger.logWarning('\n😟 SSR server has been restarted...\n')
      logger.logInfo(`[refresh browser] http://localhost:8825${env.pagePrefix}`)
      logger.logInfo(`[api enviroment]  ${env.host}${env.apiPrefix}`)
    })

    script.on('quit', () => {
      logger.logWarning('\n😨 SSR server has been stopped\n')
      process.exit()
    })

    script.on('error', err => {
      logger.logError(`\n😱 ${err.message}\n`)
      process.exit(1)
    })

    //start client dev server
    app.listen(DEV_SERVER_PORT, err => {
      logger.logInfo(`\n[DEV server] is running on port [${DEV_SERVER_PORT}]`)
    })
  })
  .catch(err => {
    logger.logError(err.message)
  })

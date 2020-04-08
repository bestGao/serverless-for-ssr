const paths = require('../config/shared/paths')
const logger = require('../config/utils').logger

const compileAsync = (name, compiler) => {
  return new Promise((resolve, reject) => {
    try {
      compiler.hooks.compile.tap(name, () => {
        logger.logInfo(`🤔 [${name}] is compiling...`)
      })
      compiler.hooks.done.tap(name, (stats) => {
        if (!stats.hasErrors()) {
          logger.logSuccess(`😀 [${name}] compiled`)
          resolve()
        } else {
          reject(`😧 compiling [${name}] with error: ${err.message}`)
        }
      })
    } catch (err) {
      reject(`😧 compiling [${name}] failed: ${err.message}`)
    }
  })
}

//剔除多余的 /
const normalizeSlash = (config) => {
  if (config) {
    const publicPath = `${paths.shared.publicPath}`.replace(/([^:])\/+/g, '$1/')

    config.output.publicPath = publicPath
  }
}

module.exports = {
  compileAsync,
  normalizeSlash,
}

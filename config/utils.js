const chalk = require('chalk')
const { green, red, yellow, blue } = chalk

function resolve(path) {
  //logInfo(`*** current resolved directory: ${process.cwd()} ***`)
  return require('path').resolve(process.cwd(), path)
}

function logSuccess(msg) {
  console.log(green(msg))
}

function logError(msg) {
  console.log(red(msg))
}

function logWarning(msg) {
  console.log(yellow(msg))
}

function logInfo(msg) {
  console.log(blue(msg))
}

module.exports = {
  resolve,
  logger: {
    logSuccess,
    logError,
    logWarning,
    logInfo,
  },
}

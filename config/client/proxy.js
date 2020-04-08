const env = require('../shared/env')

module.exports = {
  logLevel: 'error',
  target: env.host,
  pathRewrite: {
    '^/proxy': '',
  },
  changeOrigin: true,
  secure: false,
  headers: {
    Referer: env.host,
  },
}

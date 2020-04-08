/* eslint-disable */
const resolve = require('../utils').resolve
// 设置cdn地址
const cdnUrl = 'testCdn'

const DEV_SERVER_PORT = 8824
const isDEV = process.env.NODE_ENV === 'development'
const sharedPath = {
  assets: resolve('dist/assets'),
  css: resolve('dist/assets/css'),
  js: resolve('dist/assets/js'),
  publicPath: isDEV ? `http://localhost:${DEV_SERVER_PORT}/` : cdnUrl
}

const clientPath = {
  entry: resolve('src/client/index.tsx'),
  build: sharedPath.assets,
  manifest: isDEV ? resolve('dist/server/manifest.json') : resolve('server/manifest.json'),
  htmlTemplate: resolve('public/index.html'),
}

const serverPath = {
  entry: resolve('src/server/index.tsx'),
  build: resolve('dist/server'),
  favicon: resolve('dist/resources/favicon.ico'),
}

module.exports = {
  client: clientPath,
  server: serverPath,
  shared: sharedPath
}

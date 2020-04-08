const resolve = require('../utils').resolve

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']
const clientAlias = {
  '@': resolve('src'),
  styles: resolve('src/shared/styles'),
  components: resolve('src/shared/components'),
  config: resolve('config')
}
const serverAlias = {
  ...clientAlias
}

module.exports = {
  clientResolve: {
    extensions,
    alias: clientAlias,
  },
  serverResolve: {
    extensions,
    alias: serverAlias,
  }
}

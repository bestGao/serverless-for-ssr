const subModules = require.context('./', true, /\.router\.ts/)

const unionModules = subModules.keys().reduce((m, k) => m.concat(subModules(k).default), [])

export default unionModules

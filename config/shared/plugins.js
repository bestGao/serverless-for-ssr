const Path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

//暴露给浏览器端的NODE环境变量
const ClientDefineVariables = {
  'process.env.IS_SERVER': 'false',
  'process.env.IS_BROWSER': 'true',
  'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
}

//暴露给服务器端的NODE环境变量
const ServerDefineVariables = {
  'process.env.IS_SERVER': 'true',
  'process.env.IS_BROWSER': 'false',
  'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
}

const clientDev = [
  new Webpack.HotModuleReplacementPlugin(),
  new WriteFileWebpackPlugin(),// enforce files in memory to be written to disk
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  new Webpack.DefinePlugin({ ...ClientDefineVariables }),
  new LoadablePlugin({
    filename: 'manifest.json',
    writeToDisk: { filename: Path.resolve(process.cwd(), 'dist/server') },
  }),
]

const clientProd = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash:8].css'
  }),
  new Webpack.DefinePlugin({ ...ClientDefineVariables }),
  new LoadablePlugin({
    filename: 'manifest.json',
    writeToDisk: { filename: Path.resolve(process.cwd(), 'dist/server') },
  }),
  new BundleAnalyzer({ generateStatsFile: true, analyzerMode: 'disabled', statsFilename: 'analyze.json' })
]

const server = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  new Webpack.DefinePlugin({ ...ServerDefineVariables }),
  new CopyPlugin([
    { from: 'resources', to: '../resources' },
    { from: 'ecosystem.config.js', to: 'ecosystem.config.js' }
  ])
]

module.exports = {
  clientDev,
  clientProd,
  server,
}

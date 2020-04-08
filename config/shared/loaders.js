const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { loadableTransformer } = require('loadable-ts-transformer')
const tsPluginImportFactory = require('ts-import-plugin')
const Marked = require('marked')
const hljs = require('highlight.js')

const eslintLoader = {
  enforce: "pre",
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules|dist|script|config/,
  loader: "eslint-loader",
}

const tsLoader = {
  test: /(\.ts|\.tsx)$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [
            loadableTransformer,    //替换babel-loadable-plugin
            tsPluginImportFactory({ //lodash tree-shaking
              style: false,
              libraryName: 'lodash',
              libraryDirectory: null,
              camel2DashComponentName: false
            }),
            tsPluginImportFactory({ //antd tree-shaking
              style: 'css',
              libraryName: 'antd',
              libraryDirectory: 'lib',
              camel2DashComponentName: true
            })
          ]
        }),
      },
    }
  ],
  exclude: /node_modules/,
}

const mdLoader = {
  test: /\.md$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        esModule: true,
      }
    },
    {
      loader: "markdown-loader",
      options: {
        render: new Marked.Renderer(),
        highlight: function (code, language) {
          const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
          return hljs.highlight(validLanguage, code).value;
        },
      }
    }
  ]
}

const cssLoader = {
  test: /\.(css|less)$/,
  exclude: /\.module\.(css|less)$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: false,
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}

const cssModuleLoader = {
  test: /\.module\.(css|less)$/,
  exclude: /node_modules/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: process.env.NODE_ENV === 'development' ? '[path][name]__[local]' : '[hash:8]',
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}

const urlLoader = {
  test: /\.(jpg|jpeg|png|gif)$/,
  loader: 'url-loader',
  options: {
    fallback: 'file-loader',
    name: 'imgs/[name].[ext]',
    limit: 8192
  }
}

const client = [
  eslintLoader,
  tsLoader,
  cssLoader,
  cssModuleLoader,
  urlLoader,
  mdLoader,
]

const server = [
  eslintLoader,
  tsLoader,
  cssLoader,
  cssModuleLoader,
  urlLoader,
  mdLoader,
]

module.exports = {
  client,
  server,
}

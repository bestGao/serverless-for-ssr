import Express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { server as serverPaths } from 'config/shared/paths'
import useSSR from './middlewares/ssr'
import useGlobal from './middlewares/global'
import { logger as Logger } from '../../config/utils'
import proxyConfig from '../../config/client/proxy'

const SSR_PORT = process.env.PORT || 8825
const server = Express()
const isDEV = process.env.NODE_ENV === 'development'

//开发环境下用于提供静态资源服务、接口代理等，生产环境请用nginx等服务器替代
if (isDEV) {
  //本地开发跨域接口走代理
  //@ts-ignore ts bug, 字符串无法赋给其联合类型
  server.use('/proxy', createProxyMiddleware(proxyConfig))

  //本地开发提供静态资源服务(hmr问题，改为直接连接devServer)
  // server.use('/statics', Express.static('dist/assets'))

  //返回favicon
  server.use('/favicon.ico', (req, res) => {
    console.log(serverPaths.favicon)
    res.sendFile(serverPaths.favicon)
  })
}

//解析json请求体
server.use(Express.json())
//获取全局数据
server.use(useGlobal)
//服务端渲染
server.use(useSSR)

// 用于压测
// server.get('/empty', (req, res) => {
//   res.end()
// })
// server.get('/ssr', useSSR)

server.listen(SSR_PORT, () => {
  Logger.logInfo(`[SSR server] is running on port [${SSR_PORT}]`)
})

//防止某些情况下收到系统退出信号但是没释放资源
process.on('SIGINT', () => {
  server.removeAllListeners()
  process.exit(0)
})

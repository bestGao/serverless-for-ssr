import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChunkExtractor } from '@loadable/server'
import { RequestHandler } from 'express-serve-static-core'
import Html from '@/server/components/html'
import App from '@/shared/app'
import RouterConfig from '@/shared/routers'
import createStore from '@/shared/store'
import { client } from 'config/shared/paths'
import { pagePrefix } from 'config/shared/env'

const ssr: RequestHandler = async (req, res) => {
  const context: any = {}
  const reduxStore = res.locals.store || {}
  const store = createStore(reduxStore)
  //由于可能存在路径前缀的情况，必须补齐之后再匹配路由
  const [matchRoute, routeMatch] = RouterConfig.reduce((accu, r) => {
    const route = { ...r, path: `${pagePrefix}${r.path}` }
    const match = matchPath(req.path, route)

    if (match) {
      return [route, match]
    }

    return accu
  }, [])

  if (matchRoute?.getInitialProps) {
    try {
      context.initialData = await matchRoute?.getInitialProps({
        params: routeMatch.params,
        query: req.query,
        store: res.locals.store,
        req,
        res,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const statsFile = client.manifest
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] })
  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <Router basename={pagePrefix} location={req.url} context={context}>
        <App />
      </Router>
    </Provider>,
  )

  const content = ReactDOMServer.renderToString(jsx)

  //如果渲染中返回了redirect组件，则直接返回302
  if (context.url) {
    res.redirect(context.url)
  } else {
    const response = ReactDOMServer.renderToString(
      <Html
        styles={extractor.getStyleElements()}
        scripts={extractor.getScriptElements()}
        state={context.initialData}
        store={store.getState()}
      >
        {content}
      </Html>,
    )

    res.send(response)
  }
}

export default ssr

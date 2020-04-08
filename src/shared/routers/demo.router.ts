import { RouteConfigItem, GetInitialPropsCtx } from 'typings/router'
import loadable from '@loadable/component'
import { getHomeDataAsync } from '@/shared/service/cors/server'
import { getProfileMoments } from '@/shared/service/sors/server'

const RouterConfig: RouteConfigItem[] = [
  {
    path: '/demo/cors',
    component: loadable(() => import(/* webpackChunkName: "cors" */ '@/shared/pages/cors')),
    getInitialProps: (ctx: GetInitialPropsCtx) => {
      const params = { q: 'pokemon', ...ctx.query }
      return getHomeDataAsync(params, ctx)
    },
  },
  {
    path: '/demo/sors/:id',
    component: loadable(() => import(/* webpackChunkName: "sors" */ '@/shared/pages/sors')),
  },
  {
    path: '/demo/moment/:userId',
    component: loadable(() => import(/* webpackChunkName: "moment" */ '@/shared/pages/moment')),
    getInitialProps: (ctx: GetInitialPropsCtx) => {
      const params = {
        type: 0, pageNum: 1, pageSize: 30, ...ctx.query, ...ctx.params,
      }

      if (ctx.params.userId) {
        return getProfileMoments(params, ctx)
      }
      return Promise.resolve([])
    },
  },
]

export default RouterConfig

import { RouteConfigItem } from 'typings/router'
import loadable from '@loadable/component'

const RouterConfig: RouteConfigItem[] = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "basic" */ '@/shared/pages/basic')),
  },
  {
    path: '/develop',
    component: loadable(() => import(/* webpackChunkName: "develop" */ '@/shared/pages/develop')),
  },
  {
    path: '/deploy',
    component: loadable(() => import(/* webpackChunkName: "deploy" */ '@/shared/pages/deploy')),
  },
  {
    path: '/continue',
    component: loadable(() => import(/* webpackChunkName: "continue" */ '@/shared/pages/continue')),
  },
]

export default RouterConfig

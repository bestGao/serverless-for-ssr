### 语言 <a id="lang"></a>
默认语言为**Typescript**(包括服务端和客户端)，也支持混用Javascript。

### 类型定义
类型定义全部在typings目录。其中 `global.d.ts` 包含了全局的类型定义，使用时不需要引入。其余类型需使用 `import` 正常引入。

### 路由 <a id="route"></a>
路由全部采用显示配置。所有路由文件必须带后缀名 `.router.ts`。模板会自动在index中导出，模块名称就是除`.router.ts`之外的部分。

路由**不支持嵌套**，如果需要嵌套子路由，直接在页面使用`react-router`相关组件即可。

位置：`src > shared > routers > xxx.router.ts`。

例如：
```typescript
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
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "develop" */ '@/shared/pages/develop')),
  },
  {
    path: '/deploy',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "deploy" */ '@/shared/pages/deploy')),
  },
  {
    path: '/continue',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "continue" */ '@/shared/pages/continue')),
  },
]
```

### CSS预处理 <a id="css"></a>
默认支持 `css` 和 `less` 2种语法。默认不开启 `css-module`，如果需要，在样式文件名后添加 `.module.less`即可。

所有全局样式统一放到 `src > shared > styles` 目录下，并在`app.less`中统一导入。

### 数据获取 <a id="data"></a>
所有接口相关的代码都放到 `service` 目录下。并且按照页面来划分，每个页面下分别有2个文件，`index.ts` 和 `index.server.ts`。

#### 客户端 vs 服务端
按照请求环境，我们把接口分成了**2类**，一类是正常在客户端执行的请求，放在 `index.ts`文件中；另一类是在服务端渲染时执行的请求，放在 `index.server.ts`。

例如：

index.ts: 
```typescript
import { clientRequest as request } from '@/shared/utils/request'

export const getHomeDataAsync = (params: Record<string, any>) => {
  return request({
    type: 'cors',
    method: 'get',
    path: 'http://api.tvmaze.com/search/shows',
  }, params)
}
```

index.server.ts:
```typescript
import { GetInitialPropsCtx } from 'typings/router'
import { serverRequstFactory } from '@/shared/utils/request'

export const getHomeDataAsync = (
  params: Record<string, any>,
  ctx: GetInitialPropsCtx,
) => {
  const request = serverRequstFactory(ctx.req, ctx.res)
  return request({
    method: 'get',
    path: 'http://api.tvmaze.com/search/shows',
    type: 'cors',
  }, params)
}
```

两者的区别在于在服务端请求的方法，会传入一个额外的参数 **ctx**，表示当前请求的上下文，类型定义如下：
```typescript
export interface GetInitialPropsCtx {
  params?: Record<string, any>
  query?: Record<string, any>
  store?: IStoreState,
  req?: Request
  res?: Response
}
```

并且在方法内部，需要先通过 `serverRequstFactory` 方法构造一个**请求实例**，然后才能正常调用该请求。
```typescript
  const request = serverRequstFactory(ctx.req, ctx.res)
  return request({
    method: 'get',
    path: 'http://api.tvmaze.com/search/shows',
    type: 'cors',
  }, params)
```

#### 全局数据 vs 局部数据
按照数据用途，我们又可以分为2种，**全局数据**和**局部数据**。
全局数据例如用户信息，可能需要在所有接口请求之前请求(例如未登录重定向)。而局部数据则只是当前页面所需的**主要数据**。

对于全局请求，默认在 `src > shared > service > global` 下，同上，区分服务器端和客户端。

对于**局部数据**，规定只能在对应路由的配置中新增一个 **`getInitialProps`** 用于服务端数据的请求。服务端会将该方法的返回结果传递给当前页面。例如：
```typescript
const RouterConfig: RouteConfigItem[] = [
  {
    path: '/home',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "home" */ '@/shared/pages/home')),
    getInitialProps: (ctx: GetInitialPropsCtx) => {
      const params = { q: 'pokemon', ...ctx.query }
      return getHomeDataAsync(params, ctx)
    },
  },
]
```

在对应页面组件中获取数据时，必须通过模板中自带的 `WithInitialData` HOC对组件进行包裹：
```typescript
import React, { useEffect } from 'react'
import WithInitialData from '@/shared/hoc/withInitialData'

const Home: React.FC<IHomeProps> = (props) => {
  const { initialData } = props
  const { posts, getHomePostsAsync } = useHome(initialData)

  useEffect(() => {
    //在dom挂载时必须要做一个判断，当服务端渲染失败时，可以降级为客户端渲染
    if (!initialData?.length) {
      getHomePostsAsync()
    }
  }, [getHomePostsAsync, initialData, query.q])

  return null
}

Home.defaultProps = {
  className: '',
  style: {},
}

//必须通过这个HOC包裹，否则无法直接拿到服务端数据
export default WithInitialData<IHomeProps>(Home)
```

### 集成Redux <a id="redux"></a>
模板默认只有用户信息一种全局数据，如果需要额外新增，请将接口写到`global > server.ts` 下，并在 `src > server > middlewares > global.ts` 中添加数据请求代码。例如：
```typescript
import { RequestHandler } from 'express-serve-static-core'
import { getUserInfoAsync } from '@/shared/service/global/server'

const store: Record<string, any> = {}

try {
  const user = await getUserInfoAsync({ req, res })
  //如果需要新增全局状态，可以写在这里，并将结果挂载到store对象上
  //属性名务必和combineReducer中的保持一致，否则将无法生效

  store.user = user
} catch (err) {
  console.log(err)
} finally {
  res.locals.store = store
  next()
}
```

### 页面重定向 <a id="redirect"></a>
对于部分需要满足条件才能访问的页面，可以通过在`render`中返回 `<Redirect />`组件来实现服务端的重定向。

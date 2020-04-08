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

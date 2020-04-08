import { GetInitialPropsCtx } from 'typings/router'
import { serverRequstFactory } from '@/shared/utils/request'

export const getUserInfoAsync = (
  ctx: GetInitialPropsCtx,
) => {
  const request = serverRequstFactory(ctx.req, ctx.res)
  return request({
    path: '/loginInfo',
    type: 'sors',
    method: 'get',
  }).then((res: any) => res.data)
}

import { clientRequest as request } from '@/shared/utils/request'

export const getListDataAsync = (params: Record<string, any>) => {
  return request({
    type: 'sors',
    method: 'get',
    path: '/user/message/unreadList',
  }, params).then((res: any) => res.data)
}

export function getProfileMoments(params: any) {
  return request(
    {
      type: 'sors',
      path: '/user/timeline/list',
      method: 'get',
    },
    params,
  ).then<any>((res: any) => res.data)
}

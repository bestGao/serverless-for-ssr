import { clientRequest as request } from '@/shared/utils/request'

export const getHomeDataAsync = (params: Record<string, any>) => {
  return request({
    type: 'cors',
    method: 'get',
    path: 'http://api.tvmaze.com/search/shows',
  }, params)
}

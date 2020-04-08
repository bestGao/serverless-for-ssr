import axios from 'axios'
import { Request, Response } from 'express-serve-static-core'
import { prefixMap, host } from '../../../config/shared/env'

export type RequestType = 'sors' | 'cors'

export interface IRequestOption {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head'
  type: RequestType
  path: string
}

const getRequestPath = (options: IRequestOption) => {
  if (
    process.env.IS_BROWSER
    && process.env.NODE_ENV === 'development'
    && options.type === 'sors') {
    return `/proxy${prefixMap[options.type]}${options.path}`
  }

  return `${prefixMap[options.type]}${options.path}`
}

export const clientRequest = (options: IRequestOption, params?: any, config?: any) => {
  const pathname = getRequestPath(options)

  let copiedParams = options.method === 'get' ? { params } : params

  if (options.method === 'get' || options.method === 'delete' || options.method === 'head') {
    copiedParams = { ...copiedParams, ...config }
  } else {
    //config.params = sign({}, SIGN_KEY)
  }

  if (options.type === 'cors') {
    const mergedConfig = config || {}
    mergedConfig.withCredentials = false
  }

  //@ts-ignore
  return axios[options.method](pathname, copiedParams, config)
    .then((response: any) => response.data)
}

export const getServerAxiosInstance = (
  req: Request, res: Response,
  options: IRequestOption,
) => axios.create({
  baseURL: host,
  headers: {
    cookie: options.type === 'sors' ? req.headers.cookie || '' : '',
  },
})

export const serverRequstFactory = (req: Request, res: Response) => (
  options: IRequestOption,
  params?: any,
  config?: any,
) => {
  const requestor = getServerAxiosInstance(req, res, options)
  const pathname = getRequestPath(options)

  let copiedParams = options.method === 'get' ? { params } : params

  if (options.method === 'get' || options.method === 'delete' || options.method === 'head') {
    copiedParams = { ...copiedParams, ...config }
  } else {
    //config.params = sign({}, SIGN_KEY)
  }

  //@ts-ignore
  return requestor[options.method](pathname, copiedParams, config)
    .then((response: any) => response.data)
}

import { RouteProps } from 'react-router-dom'
import { Request, Response } from 'express-serve-static-core'
import { IStoreState } from './store'

export interface RouteConfigItem extends Omit<RouteProps, 'path'> {
  path: string
  getInitialProps?: (params: GetInitialPropsCtx) => Promise<any>
}

export interface GetInitialPropsCtx {
  params?: Record<string, any>
  query?: Record<string, any>
  store?: IStoreState,
  req?: Request
  res?: Response
}

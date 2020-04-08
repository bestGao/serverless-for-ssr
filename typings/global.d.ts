/* eslint-disable no-inner-declarations */
declare module '*.less'
declare module '*.css'
declare module '*.md'

declare interface Window {
  initialStore?: any
  initialData?: any
  withLoadableChunks: Promise<any>[]
  __REDUX_DEVTOOLS_EXTENSION__: () => any
}

// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    'IS_SERVER': boolean
    'IS_BROWSER': boolean
    'NODE_ENV': 'development' | 'production'
    'API_ENV': 'dev' | 'test' | 'uat' | 'prod'
  }
}

declare interface SSRPage<T = any> {
  initialData: T
}

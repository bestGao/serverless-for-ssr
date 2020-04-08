const NODE_ENV = process.env.NODE_ENV
const API_ENV = process.env.API_ENV

//不同接口环境顶级域名映射
const TOPDOMAIN_MAP = {
  dev: 'net',
  test: 'net',
  uat: 'cn',
  prod: 'cn'
}

//不同接口环境同域路径前缀的映射
const API_PREFIX_MAP = {
  dev: '/bbs/newweb-dev',
  test: '/bbs/newweb-test',
  uat: '/bbs/newweb-uat',
  prod: '/bbs/newweb'
}

//不同环境前端页面路径前缀的映射
const PAGE_PREFIX_MAP = {
  dev: '/bbs/newweb-dev/pc',
  test: '/bbs/newweb-test/pc',
  uat: '/bbs/newweb-uat/pc',
  prod: '/bbs/newweb/pc'
}

//顶级域名 cn/net
const topDomain = TOPDOMAIN_MAP[API_ENV]

//后端接口路径前缀
const apiPrefix = API_PREFIX_MAP[API_ENV]

//前端页面路径前缀
const pagePrefix = PAGE_PREFIX_MAP[API_ENV]

// hostname
const hostName = 'jakieGao'

//不同接口环境接口域名
const host = `https://www.${hostName}.${topDomain}`

//不同接口环境接口路径前缀
const prefixMap = {
  //跨域类型请求
  cors: '',
  //同域类型请求(same-origin-resource-sharing)
  sors: apiPrefix
}

module.exports = {
  host,
  prefixMap,
  topDomain,
  apiPrefix,
  pagePrefix,
}

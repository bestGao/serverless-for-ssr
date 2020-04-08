import { RequestHandler } from 'express-serve-static-core'
import { getUserInfoAsync } from '@/shared/service/global/index.server'

const useGlobal: RequestHandler = async (req, res, next) => {
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
}

export default useGlobal

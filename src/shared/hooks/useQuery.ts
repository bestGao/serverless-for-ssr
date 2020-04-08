import { Location } from 'history'
import { parseQS } from '@/shared/utils'

//只是普通函数，写成hooks是为了减少后期修改（react-router可能会提供useQuery这样的api）
export default <T extends Record<string, string> = {}>(location?: Location): T => {
  if (!location) return {} as T

  return parseQS(location?.search)
}

//更加感性的时间，例如刚刚，几分钟前，几天前
export const formatNatureTime = (timestamp: number) => {
  const present = Date.now()
  const past = timestamp
  const diff = present - past

  //1分钟毫秒级跨度
  const minuteSpan = 60 * 1000
  //1小时毫秒级跨度
  const hourSpan = 60 * minuteSpan
  //1天毫秒级跨度
  const daySpan = 24 * hourSpan
  //1月毫秒级跨度，默认按照30天
  const monthSpan = 30 * daySpan
  //1年毫秒级跨度，不精确，默认按照365天
  const yearSpan = 365 * daySpan

  if (diff <= minuteSpan) {
    return '刚刚'
  } if (diff <= hourSpan) {
    return `${Math.ceil(diff / minuteSpan)} 分钟前`
  } if (diff <= daySpan) {
    return `${Math.ceil(diff / hourSpan)} 小时前`
  } if (diff <= monthSpan) {
    return `${Math.ceil(diff / daySpan)} 天前`
  } if (diff <= yearSpan) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}-${date.getDay()}`
  }

  const date = new Date(timestamp)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
}

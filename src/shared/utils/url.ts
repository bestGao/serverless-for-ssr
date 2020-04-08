import {
  host, topDomain, pagePrefix, apiPrefix,
} from 'config/shared/env'

export const getLoginUrl = () => {
  return `https://auth.${host}.${topDomain}/login?service=${encodeURIComponent(
    `${host}${apiPrefix}/user/index.do?done=${encodeURIComponent(`${host}${pagePrefix}`)}`,
  )}`
}

export function filterAnchorXSS(input: string | number = '') {
  return input.toString().replace(/javascript:/, '')
}

export const getThreadUrl = (threadId: number, replyId?: number) => {
  if (!threadId) return ''

  const newThreadId = Number(filterAnchorXSS(threadId))
  const newReplyId = Number(filterAnchorXSS(replyId))

  if (replyId === -1 || replyId > 0) {
    return `${host}${pagePrefix}/post/${newThreadId}?replyId=${newReplyId}`
  }
  return `${host}${pagePrefix}/post/${newThreadId}?replyId=${newReplyId}`
}

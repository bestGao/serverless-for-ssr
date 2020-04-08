import qs from 'qs'

export const assert = (condition: boolean, executer: () => any) => {
  if (condition && typeof executer === 'function') {
    executer()
  }
}

export const parseQS = (search: string = '') => {
  if (search.indexOf('?') === 0) {
    return qs.parse(search.substring(1))
  }
  return qs.parse(search)
}

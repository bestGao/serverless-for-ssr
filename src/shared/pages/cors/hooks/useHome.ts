import { getHomeDataAsync } from '@/shared/service/cors'
import useFetch from '@/shared/hooks/useFetch'

const useHome = (defaultPosts: any[] = []) => {
  const defaultState = Array.isArray(defaultPosts) ? defaultPosts : []
  const {
    data,
    loading,
    fetchAsync,
  } = useFetch<any[], { q: string }>(defaultState, getHomeDataAsync)

  const getHomePostsAsync = fetchAsync

  return {
    posts: data,
    loading,
    getHomePostsAsync,
  }
}

export default useHome

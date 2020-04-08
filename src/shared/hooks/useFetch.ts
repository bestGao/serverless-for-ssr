import { useState, useCallback } from 'react'

const useFetch = <S, P>(initialState: S, request: (params: P) => Promise<S>) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<S>(initialState)
  const [err, setError] = useState<Error>(null)
  const fetchAsync = useCallback<(params: P) => Promise<void>>((params: P) => {
    setLoading(true)
    return request(params).then((res) => {
      setData(res)
    })
      .catch<void>((error) => {
      setError(error)
    })
      .finally(() => {
        setLoading(false)
      })
  }, [request])

  return {
    loading,
    data,
    err,
    fetchAsync,
  }
}

export default useFetch

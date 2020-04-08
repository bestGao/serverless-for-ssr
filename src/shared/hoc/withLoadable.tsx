import React, {
  useState, useEffect, useRef,
} from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface IWithLoadableProps extends
  RouteComponentProps<{}, { statusCode?: number, initialData: any }>, SSRPage {
}

type LoaderType = () => Promise<any> | React.ComponentType<any>
type LoaderResultType = ReturnType<LoaderType>

function isAsyncLoader(loaderResult: ReturnType<LoaderType>): loaderResult is Promise<any> {
  return !!(loaderResult as Promise<any>)?.then
}

function WithLoadable<P extends IWithLoadableProps>(loader: LoaderType) {
  let cache: ReturnType<LoaderType> = null
  const loadOnce = (onceLoader: LoaderType) => {
    if (cache) {
      return cache
    }

    cache = onceLoader()

    if (process.env.IS_BROWSER) {
      if (!Array.isArray(window.withLoadableChunks)) {
        window.withLoadableChunks = []
      }

      const chunks = window.withLoadableChunks

      if (isAsyncLoader(cache) && !chunks.find((c) => c === cache)) {
        chunks.push(cache)
      }
    }

    return cache
  }

  if (process.env.IS_BROWSER) {
    loadOnce(loader)
  }

  const WithLoadableComponent: React.FC<P> = (props) => {
    const [loading, setLoading] = useState(true)
    const PageComponentRef = useRef<LoaderResultType>(loadOnce(loader))
    const PageComponent = PageComponentRef.current

    useEffect(() => {
      if (isAsyncLoader(PageComponent)) {
        PageComponent.then(({ default: component }) => {
          PageComponentRef.current = component
          setLoading(false)
        })
          .catch((err) => {
            console.log(err)
          })
      }
    }, [PageComponent])

    return isAsyncLoader(PageComponent) ? null : <PageComponent {...props} />
  }

  return WithLoadableComponent
}

export default WithLoadable

export const loadableReady = () => {
  if (!Array.isArray(window.withLoadableChunks)) {
    window.withLoadableChunks = []
  }
  console.log([...window.withLoadableChunks])
  return Promise.all(window.withLoadableChunks)
}

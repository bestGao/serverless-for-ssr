import React, { useEffect } from 'react'
import { RouteComponentProps, useLocation } from 'react-router-dom'
import WithInitialData from '@/shared/hoc/withInitialData'
import { assert } from '@/shared/utils'
import useQuery from '@/shared/hooks/useQuery'
import useHome from './hooks/useHome'
import './index.less'

export interface IHomeProps extends RouteComponentProps<
{},
{ statusCode?: number, initialData: any }
>, SSRPage {
  className?: string
  style?: React.CSSProperties
}

const Home: React.FC<IHomeProps> = (props) => {
  const { initialData } = props
  const location = useLocation()
  const query = useQuery<{ q: string }>(location)
  const { posts, getHomePostsAsync } = useHome(initialData)

  assert(process.env.IS_BROWSER, () => console.log('[initialData] ', initialData, query))

  useEffect(() => {
    if (!initialData?.length) {
      getHomePostsAsync({ q: query.q })
    }
  }, [getHomePostsAsync, initialData, query.q])

  return (
    <div className='home-wrap'>
      <h3>刷新页面试一下吧</h3>
      <div>
        {
          posts?.map((d: any) => {
            return (
              <div key={d?.show?.id}>
                <img
                  alt='cover'
                  style={{
                    width: 64, height: 64, objectFit: 'cover',
                  }}
                  src={d?.show?.image?.medium}
                />
                <div dangerouslySetInnerHTML={{ __html: d?.show?.summary }} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

Home.defaultProps = {
  className: '',
  style: {},
}

export default WithInitialData<IHomeProps>(Home)

/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ThreadCard from '@/shared/components/ThreadCard'
import WithInitialData from '@/shared/hoc/withInitialData'
import useQuery from '@/shared/hooks/useQuery'
import useMoment from './hooks/useMoment'
import './index.less'

export interface IMomentProps extends
  SSRPage, RouteComponentProps<{ userId: string }, { statusCode?: number, initialData: any }> {
  className?: string
  style?: React.CSSProperties
}

const Moment: React.FC<IMomentProps> = (props) => {
  const {
    match, initialData, location, history,
  } = props
  const query = useQuery<{ pageNum: string }>(location)
  const pageNum = Number(query.pageNum) || 1

  const {
    moments,
    getMomentsAsync,
  } = useMoment(Number(match?.params.userId), pageNum, initialData)

  useEffect(() => {
    if (!Array.isArray(initialData)) {
      getMomentsAsync()
    }
  }, [getMomentsAsync, initialData])

  return (
    <div className='moment-wrap'>
      <button onClick={() => history.push(`?pageNum=${pageNum + 1}`)}>Next</button>
      <div className='list'>
        { moments.map((m) => <ThreadCard key={m.id} thread={m} className='thread-item' />) }
      </div>
    </div>
  )
}

Moment.defaultProps = {
  className: '',
  style: {},
}

export default WithInitialData<IMomentProps>(Moment)

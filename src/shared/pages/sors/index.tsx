import React, { useState, useEffect } from 'react'
import { getListDataAsync } from '@/shared/service/sors'
import './index.less'

export interface IAboutProps {
  className?: string
  style?: React.CSSProperties
}

const About: React.FC<IAboutProps> = (props) => {
  const [data, setData] = useState({ result: [] })

  useEffect(() => {
    getListDataAsync({ pageNum: 1, pageSize: 20 })
      .then((items: any) => setData(items))
  }, [])

  return (
    <div className='about-wrap'>
      <div>
        {
          data?.result?.map((item) => <div key={item.id}>{item.lastMessageSimple}</div>)
        }
      </div>
    </div>
  )
}

About.defaultProps = {
  className: '',
  style: {},
}

export default About

import React from 'react'
import html from './readme.md'

export interface IDevelopProps {
  className?: string
  style?: React.CSSProperties
}

const Develop: React.FC<IDevelopProps> = (props) => {
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
}

Develop.defaultProps = {
  className: '',
  style: {},
}

export default Develop

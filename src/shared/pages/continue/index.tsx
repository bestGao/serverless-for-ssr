import React from 'react'
import html from './readme.md'

export interface IContinueProps {
  className?: string
  style?: React.CSSProperties
}

const Continue: React.FC<IContinueProps> = (props) => {
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
}

Continue.defaultProps = {
  className: '',
  style: {},
}

export default Continue

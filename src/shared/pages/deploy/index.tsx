import React from 'react'
import html from './readme.md'

export interface IDeployProps {
  className?: string
  style?: React.CSSProperties
}

const Deploy: React.FC<IDeployProps> = (props) => {
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
}

Deploy.defaultProps = {
  className: '',
  style: {},
}

export default Deploy

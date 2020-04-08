import React from 'react'
import html from './readme.md'

export interface IBasicProps {
  className?: string
  style?: React.CSSProperties
}

const Basic: React.FC<IBasicProps> = (props) => {
  return <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
}

Basic.defaultProps = {
  className: '',
  style: {},
}

export default Basic

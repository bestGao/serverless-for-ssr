/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import cls from 'classnames'
import './index.less'

export interface IDropdownProps {
  className?: string
  style?: React.CSSProperties,
  title: string
  expand?: boolean
  children: React.ReactNode
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const {
    className, style, title, children, expand = false,
  } = props
  const [collapse, setCollapse] = useState(true)

  return (
    <div className={cls('dropdown-wrap', className)} style={style} onClick={() => setCollapse(!collapse)}>
      <svg className={cls('icon', { open: (expand || !collapse) })} width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7' stroke='#999' strokeLinecap='square' />
      </svg>
      <span>{ title }</span>
      {
        (collapse && !expand) ? null : (
          <div className='children-wrap' onClick={(e) => { e.stopPropagation() }}>
            {React.Children.map(children, (child) => React.cloneElement(child as any, { className: 'menu-item' }))}
          </div>
        )
      }
    </div>
  )
}

Dropdown.defaultProps = {
  className: '',
  style: {},
}

export default Dropdown

import React from 'react'
import cls from 'classnames'
import './index.less'

interface INavbarProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Navbar: React.FC<INavbarProps> = ({ className, style, children }) => {
  return (
    <nav className={cls('navbar-wrap border-box flex-wrap', className)} style={style}>{children}</nav>
  )
}

export default Navbar

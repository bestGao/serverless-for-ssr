import React from 'react'
import { IUser } from 'typings/store'
import { getLoginUrl } from '@/shared/utils/url'
import styles from './index.module.less'

export interface IAvatarProps {
  className?: string
  style?: React.CSSProperties
  user: Partial<IUser>
}

const Avatar: React.FC<IAvatarProps> = (props) => {
  const { className, style, user } = props

  return user?.userId ? (
    <div className={`${styles.avatarWrap} ${className}`} style={style}>
      <img alt='avatar' src={user?.avatarInfo} />
      <span className={styles.name}>{ user?.nickname }</span>
    </div>
  ) : (
    <div className={`${styles.avatarWrap} ${className}`} style={style}>
      <a href={getLoginUrl()} className={styles.loginBtn}>请登录</a>
    </div>
  )
}

Avatar.defaultProps = {
  className: '',
  style: {},
}

export default Avatar

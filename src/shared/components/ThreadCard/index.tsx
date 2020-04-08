import React from 'react'
import cls from 'classnames'
// import { parseOverTenThousandNum } from '@/utils/numberUtils'
import { getThreadUrl } from '@/shared/utils/url'
import styles from './index.module.less'

export interface IBriefThread {
  id: number //主贴或回帖id
  rootId: number //主贴id
  tags?: {
    isQuality: boolean //优质
    isDigest: boolean //精华
    isCase: boolean //病例
    isWanted: boolean //悬赏
  }
  isReply: boolean //是否回帖
  isQualityReply: boolean //是否有料回复
  title: string //主贴标题
  content: string //主贴或回帖主体
  cover?: string //图片
  hasVideos: boolean //包含视频
  reads: number //浏览
  replies: number //讨论
  createTime: string //发布时间
  special?: {
    id: number //专题id
    name: string //专题名称
    description?: string //专题简介
  }
  threadReviewStatus: ThreadReviewStatusEnums
  videoReviewStatus: VideoReviewStatusEnums
  user: {
    userId: number
    username: string
    nickname: string
  }
}

export interface IThreadCardProps {
  className?: string
  style?: React.CSSProperties
  thread: IBriefThread
}

export enum ThreadReviewStatusEnums {
  resolved = 0, //审核通过
  deleted = 1, //被删除
  banned = 3, //用户被屏蔽
  pending = 2, //审核中
}

export enum VideoReviewStatusEnums {
  resolved = 1, //审核通过
  pending = 4, //审核中
  uploading = 2, //上传中
  uploadFailed = 3, //上传失败
  rejected = 5, //审核未通过
}

// 渲染主贴标签
export function renderOrdinaryTag(tags: Partial<IBriefThread['tags']>, className = '') {
  if (tags.isQuality) {
    return (
      <span className={cls(styles.threadCardTag, styles.qualityThreadTag, className)}>优质</span>
    )
  } if (tags.isDigest) {
    return (
      <span className={cls(styles.threadCardTag, styles.digestThreadTag, className)}>精华</span>
    )
  } if (tags.isWanted) {
    return (
      <span className={cls(styles.threadCardTag, styles.wantedThreadTag, className)}>悬赏</span>
    )
  } if (tags.isCase) {
    return <span className={cls(styles.threadCardTag, styles.caseThreadTag, className)}>病例</span>
  }
  return null
}

// 渲染回贴标签
export function renderReplyTag(isQualityReply: boolean = false, className = '') {
  if (isQualityReply) {
    return (
      <span className={cls(styles.threadCardTag, styles.qualityReplyTag, className)}>有料回复</span>
    )
  }
  return <span className={cls(styles.threadCardTag, styles.replyTag, className)}>回帖</span>
}

// 渲染审核帖子标签
export function renderThreadReviewTag(status: ThreadReviewStatusEnums, className = '') {
  switch (status) {
    case ThreadReviewStatusEnums.pending: {
      return (
        <span className={cls(styles.threadCardTag, styles.pendingManualTag, className)}>
          人工审核中
        </span>
      )
    }
    default: {
      return null
    }
  }
}

// 渲染审核视频标签
export function renderVideoReviewTag(status: VideoReviewStatusEnums, className = '') {
  switch (status) {
    case VideoReviewStatusEnums.uploading: {
      return (
        <span className={cls(styles.threadCardTag, styles.uploadingTag, className)}>
          视频上传中
        </span>
      )
    }
    case VideoReviewStatusEnums.uploadFailed: {
      return (
        <span className={cls(styles.threadCardTag, styles.uploadFailedTag, className)}>
          视频上传已中断
        </span>
      )
    }
    case VideoReviewStatusEnums.pending: {
      return (
        <span className={cls(styles.threadCardTag, styles.pendingAutoTag, className)}>
          视频审核中
        </span>
      )
    }
    case VideoReviewStatusEnums.rejected: {
      return (
        <span className={cls(styles.threadCardTag, styles.rejectTag, className)}>
          视频审核未通过
        </span>
      )
    }
    default: {
      return null
    }
  }
}

const ThreadCard: React.FC<IThreadCardProps> = (props) => {
  const { thread, className, style } = props
  const renderMainThread = () => {
    return (
      <>
        <a href={getThreadUrl(thread?.rootId)} target='_blank' rel='noopener noreferrer'>
          {thread.cover ? (
            <div className={styles.coverWrap}>
              <img alt='cover' src={thread?.cover} />
              {thread.hasVideos ? <i className={styles.playBtn} /> : null}
            </div>
          ) : null}
          <div className={styles.infoWrap}>
            <div className={cls(styles.titleWrap, 'twoRowEllipsis')}>
              {renderOrdinaryTag({ isQuality: thread?.tags?.isQuality }, styles.tags)}
              {renderOrdinaryTag({ isDigest: thread?.tags?.isDigest }, styles.tags)}
              {thread?.tags?.isCase
                ? renderOrdinaryTag({ isCase: true }, styles.tags)
                : renderOrdinaryTag({ isWanted: thread?.tags?.isWanted }, styles.tags)}
              {/* 优先显示帖子审核标签，如果正常，显示视频审核标签 */}
              {renderThreadReviewTag(thread?.threadReviewStatus, styles.tags)
                || renderVideoReviewTag(thread?.videoReviewStatus, styles.tags)}
              <span className={styles.title}>{thread?.title}</span>
            </div>
            <p className={cls(styles.content, 'twoRowEllipsis')}>{thread.content}</p>
          </div>
        </a>
        <div className={cls(styles.footerWrap, { [styles.offsetTopWithCover]: !thread.cover })}>
          <span className={styles.extra}>
            讨论
            {thread.replies}
          </span>
          {' '}
          <span className={styles.extra}>
            浏览
            {thread.reads}
          </span>
          {thread?.special?.id ? (
            <span className={cls(styles.extra, styles.special)}>
              专题：
              <a
                href='/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {thread?.special?.name}
              </a>
            </span>
          ) : null}
          <span className={styles.createTime}>{thread.createTime}</span>
        </div>
      </>
    )
  }

  const renderReplyThread = () => {
    return (
      <>
        {thread.cover ? (
          <div className={styles.coverWrap}>
            <img alt='cover' src={thread?.cover} />
            {thread.hasVideos ? <i className={styles.playBtn} /> : null}
          </div>
        ) : null}
        <div className={cls(styles.infoWrap, styles.replyInfoWrap)}>
          <a
            href={getThreadUrl(thread?.rootId, thread?.id)}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className={cls(styles.titleWrap, 'twoRowEllipsis')}>
              {renderReplyTag(thread?.isQualityReply, styles.tags)}
              {/* 优先显示帖子审核标签，如果正常，显示视频审核标签 */}
              {renderThreadReviewTag(thread?.threadReviewStatus, styles.tags)
                || renderVideoReviewTag(thread?.videoReviewStatus, styles.tags)}
              <span className={styles.title}>{thread?.content}</span>
            </div>
          </a>
          <a href={getThreadUrl(thread?.rootId)} target='_blank' rel='noopener noreferrer'>
            <p className={cls(styles.content, 'twoRowEllipsis')}>{thread?.title}</p>
          </a>
        </div>
        <div className={cls(styles.footerWrap, { [styles.offsetTopWithCover]: !thread.cover })}>
          <span className={styles.extra}>
            讨论
            {thread?.replies}
          </span>
          {' '}
          <span className={styles.extra}>
            浏览
            {thread?.reads}
          </span>
          <span className={styles.extra}>
            楼主：
            <a
              href='/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.hoverable}
            >
              {thread?.user?.nickname?.length > 8
                ? `${thread?.user?.nickname?.substring(0, 8)}...`
                : thread?.user?.nickname}
            </a>
          </span>
          <span className={styles.createTime}>{thread.createTime}</span>
        </div>
      </>
    )
  }

  return (
    <div className={cls(styles.threadCardWrap, className)} style={style}>
      {!thread?.isReply ? renderMainThread() : renderReplyThread()}
    </div>
  )
}

ThreadCard.defaultProps = {
  className: '',
  style: {},
}

export default ThreadCard

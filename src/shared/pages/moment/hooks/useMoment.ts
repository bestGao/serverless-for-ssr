import { useState, useCallback, useRef } from 'react'
import { IBriefThread, VideoReviewStatusEnums } from '@/shared/components/ThreadCard'
import { getProfileMoments } from '@/shared/service/sors'
import { formatNatureTime } from '@/shared/utils/format'

export enum MomentFilterEnums {
  all = 0,
  qualityThread = 1,
  qualityReply = 2,
}

export const transformMoment = (
  raw: any,
): IBriefThread => {
  const isReply = raw?.extra?.id !== raw?.extra?.rootId
  const videos = (raw?.extra?.postVideos || []) as {
    cover: string
    auditState: VideoReviewStatusEnums
  }[]
  const images = (raw?.extra?.postImages || []) as { url: string }[]
  const cover = videos.length > 0 ? videos[0]?.cover : images[0]?.url
  const special = (raw?.extra?.specials || [])[0]

  return {
    id: raw?.extra?.id,
    rootId: raw?.extra?.rootId,
    tags: {
      isQuality: raw?.extra?.qualityPost && !isReply,
      isDigest: raw?.extra?.archived,
      isCase: raw?.extra?.contentType === 1,
      isWanted: raw?.extra?.contentType === 2,
    },
    isReply,
    isQualityReply: isReply && raw?.extra?.qualityPost,
    title: raw?.title,
    content: raw?.content,
    cover,
    hasVideos: videos.length > 0,
    reads: raw?.extra?.reads,
    replies: raw?.extra?.replies,
    createTime: formatNatureTime(raw?.createTime),
    special: {
      id: special?.specialId,
      name: special?.specialName,
    },
    user: {
      userId: raw?.user?.userId,
      username: raw?.user?.username,
      nickname: raw?.user?.nickname,
    },
    threadReviewStatus: raw?.extra?.postStatus,
    videoReviewStatus: videos[0]?.auditState,
  }
}

const useMoments = (userId: number, pageNum: number, initialData: any[]) => {
  const [loading, setLoading] = useState(true)
  const [moments, setMoments] = useState<IBriefThread[]>(
    Array.isArray(initialData) ? initialData : [],
  )

  const getMomentsAsync = useCallback(() => {
    setLoading(true)
    return getProfileMoments({
      userId,
      type: MomentFilterEnums.all,
      pageNum,
      pageSize: 30,
    })
      .then((data: any) => {
        setMoments(data?.result?.map((d: any) => transformMoment(d)))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userId, pageNum])

  return {
    moments,
    loading,
    getMomentsAsync,
  }
}

export default useMoments

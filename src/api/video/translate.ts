import { formatDate, formatDuration, translateCount } from '@/utils/util'
import { AxiosResponse } from 'axios'
import { getMvZan, getMvUrl, getVideoZan, getVideoUrl } from '.'
import { getSingerInfo } from '../singer'

export const convertMvList = (res: AxiosResponse<any>) => {
  const { data, count } = res.data
  if (!data || !data.length) return
  const mvList: Mv[] = data.map((mv) => {
    return {
      id: mv.id,
      name: mv.name,
      picUrl: mv.cover,
      artistId: mv.artistId,
      artistName: mv.artistName,
      durationStr: formatDuration(mv.duration),
      playCount: translateCount(mv.playCount)
    }
  })
  return {
    mvList,
    total: count || 0
  }
}

export const convertMvdetail = async (res: AxiosResponse<any>) => {
  const { data } = res.data
  if (!data) return
  const { singerInfo } = await getSingerInfo(data.artistId)
  const { data: { likedCount } } = await getMvZan(data.id)
  const { data: { data: { url } } } = await getMvUrl(data.id)
  return {
    id: data.id,
    name: data.name,
    url,
    likedCount,
    creatorName: data.artistName,
    avatarUrl: singerInfo.picUrl,
    posterUrl: data.cover,
    publishTime: data.publishTime,
    subCount: data.subCount,
    shareCount: data.shareCount,
    playCount: translateCount(data.playCount),
    intro: data.desc || '',
    videoGroup: data.videoGroup
  }
}

export const convertVideodetail = async (res: AxiosResponse<any>) => {
  const { data } = res.data
  if (!data) return
  const { data: { likedCount } } = await getVideoZan(data.vid)
  const { data: { urls } } = await getVideoUrl(data.vid)
  return {
    id: data.vid,
    name: data.title,
    url: urls[0].url,
    likedCount,
    creatorName: data.creator.nickname,
    avatarUrl: data.creator.avatarUrl,
    posterUrl: data.coverUrl,
    publishTime: formatDate(data.publishTime),
    subCount: data.subscribeCount,
    shareCount: data.shareCount,
    playCount: translateCount(data.playTime),
    intro: data.description || '',
    videoGroup: data.videoGroup
  }
}

export const convertRelateVideo = (res: AxiosResponse<any>) => {
  const { data } = res.data
  if (!data || !data.length) return

  return data.map((video) => {
    return {
      id: video.vid,
      title: video.title,
      creator: video.creator[0].userName,
      coverUrl: video.coverUrl,
      playCount: translateCount(video.playTime),
      durationStr: formatDuration(video.durationms)
    }
  })
}

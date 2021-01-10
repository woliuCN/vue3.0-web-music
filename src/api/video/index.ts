import { convertComments } from '../translate'
import { getRequest } from '../request'
import { convertMvdetail, convertMvList, convertRelateVideo, convertVideodetail } from './translate'
const COMMIT_LIMIT = 60
const MVLIST_LIMIT = 105
const REQUEST_URL = {
  mvList: '/mv/all',
  mvDetail: '/mv/detail',
  // mv赞数量
  mvZan: 'mv/detail/info',
  mvUrl: '/mv/url',
  mvComment: '/comment/mv',
  videoDetail: '/video/detail',
  videoZan: '/video/detail/info',
  videoUrl: '/video/url',
  videoComment: '/comment/video',
  related: '/related/allvideo'

}

export const getMvList = (area: string, type: string, order: string, currentPage: number) => {
  return getRequest(REQUEST_URL.mvList, { area, type, order, limit: MVLIST_LIMIT, offset: (currentPage - 1) * MVLIST_LIMIT }).then(convertMvList)
}

export const getMvDetail = (id: number) => {
  return getRequest(REQUEST_URL.mvDetail, { mvid: id }).then(convertMvdetail)
}
export const getMvZan = (id: number) => {
  return getRequest(REQUEST_URL.mvZan, { mvid: id })
}

export const getMvUrl = (id: number) => {
  return getRequest(REQUEST_URL.mvUrl, { id })
}

export const getMvComment = (id: string | number, currentPage: number) => {
  return getRequest(REQUEST_URL.mvComment, { id, limit: COMMIT_LIMIT, offset: (currentPage - 1) * COMMIT_LIMIT }).then(convertComments)
}

export const getRelatedVideo = (id: number | string) => {
  return getRequest(REQUEST_URL.related, { id }).then(convertRelateVideo)
}

export const getVideoDetail = (id: string) => {
  return getRequest(REQUEST_URL.videoDetail, { id }).then(convertVideodetail)
}
export const getVideoZan = (id: string) => {
  return getRequest(REQUEST_URL.videoZan, { vid: id })
}

export const getVideoUrl = (id: string) => {
  return getRequest(REQUEST_URL.videoUrl, { id })
}

export const getVideoComment = (id: string | number, currentPage: number) => {
  return getRequest(REQUEST_URL.videoComment, { id, limit: COMMIT_LIMIT, offset: (currentPage - 1) * COMMIT_LIMIT }).then(convertComments)
}

import { COMMENT_LIMIT } from '@/utils/constant'
import { convertDetails } from './translate'
import { convertComments } from '../translate'
import { getRequest } from '../request'
const REQUEST_URL = {
  detail: '/album',
  comment: '/comment/album',
  count: '/album/detail/dynamic'
}

export const getAlbumDetails = (id: number) => {
  return getRequest(REQUEST_URL.detail, { id }).then(convertDetails)
}

export const getAlbumAllCount = (id: number) => {
  return getRequest(REQUEST_URL.count, { id })
}

export const getAlbumComments = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.comment, { id, limit: COMMENT_LIMIT, offset: (currentPage - 1) * COMMENT_LIMIT }).then(convertComments)
}

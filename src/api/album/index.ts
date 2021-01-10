import { convertComments } from '../translate'
import { getRequest } from '../request'
import { convertDetails } from './translate'
const COMMIT_LIMIT = 60
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
  return getRequest(REQUEST_URL.comment, { id, limit: COMMIT_LIMIT, offset: (currentPage - 1) * COMMIT_LIMIT }).then(convertComments)
}

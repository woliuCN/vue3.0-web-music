import { COMMENT_LIMIT } from '@/utils/constant'
import { convertDetail } from './translate'
import { convertComments } from '../translate'
import { getRequest } from '../request'
export interface AlbumDetail {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  publishTime: string;
  subscribedCount: number | string;
  shareCount: number | string;
  coverImgUrl: string;
  description: string;
  songs: Song[];
}
const REQUEST_URL = {
  detail: '/album',
  comment: '/comment/album',
  count: '/album/detail/dynamic'
}

export const getAlbumDetail = (id: number) => {
  return getRequest(REQUEST_URL.detail, { id }).then(convertDetail)
}

export const getAlbumAllCount = (id: number) => {
  return getRequest(REQUEST_URL.count, { id })
}

export const getAlbumComments = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.comment, { id, limit: COMMENT_LIMIT, offset: (currentPage - 1) * COMMENT_LIMIT }).then(convertComments)
}

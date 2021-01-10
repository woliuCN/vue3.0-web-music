import { getRequest } from '../request'
import { convertSongs, convertLyrics, convertSimiSongs } from './translate'
import { convertComments } from '../translate'
const REQUEST_URL = {
  songDetail: '/song/detail',
  songLyric: '/lyric',
  songComment: '/comment/music',
  simiSong: '/simi/song'
}

const LIMIT = 20
export const getSongDetail = (ids: string) => {
  return getRequest(REQUEST_URL.songDetail, { ids }).then(convertSongs)
}

export const getSongLyrics = (id: number) => {
  return getRequest(REQUEST_URL.songLyric, { id }).then(convertLyrics)
}

export const getSongCommentInfo = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.songComment, { id, limit: LIMIT, offset: (currentPage - 1) * LIMIT }).then(convertComments)
}

export const getSimiSongs = (id: number) => {
  return getRequest(REQUEST_URL.simiSong, { id }).then(convertSimiSongs)
}

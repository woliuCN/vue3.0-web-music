import { getRequest } from '../request'
import { convertTopSongs } from './translate'
const REQUEST_URL = {
  topSongs: '/top/song'
}

// 新歌速递
export const getTopSongs = (type: number) => {
  return getRequest(REQUEST_URL.topSongs, { type }).then(convertTopSongs)
}

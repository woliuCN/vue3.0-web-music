import { getRequest } from './request'
const REQUEST_URL = {
  songDetail: '/song/detail'
}

export const getSongs = (ids: string) => {
  return getRequest(REQUEST_URL.songDetail, { ids })
}

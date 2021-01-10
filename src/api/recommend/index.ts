import { getRequest } from '../request'
import { convertBanners, convertPlayLists, convertOwnerSendLists, convertLatestSongLists, convertMvLists } from './translate'
const REQUEST_URL = {
  banner: '/banner',
  playList: '/personalized',
  ownerSend: '/personalized/privatecontent',
  newSong: '/personalized/newsong',
  mv: '/personalized/mv'
}

// 获取轮播图
export const getBanners = () => {
  return getRequest(REQUEST_URL.banner).then(convertBanners)
}

// 获取推荐榜单
export const getRecommendPlayLists = () => {
  return getRequest(REQUEST_URL.playList, { limit: 10 }).then(convertPlayLists)
}

export const getOwnerSendLists = () => {
  return getRequest(REQUEST_URL.ownerSend).then(convertOwnerSendLists)
}

export const getLatestSongLists = () => {
  return getRequest(REQUEST_URL.newSong, { limit: 12 }).then(convertLatestSongLists)
}

export const getRecommendMvLists = () => {
  return getRequest(REQUEST_URL.mv).then(convertMvLists)
}

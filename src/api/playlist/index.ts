import { getRequest } from '../request'
import { convertComments } from '../translate'
import { COMMENT_LIMIT, PLAYLIST_LIMIT } from '@/utils/constant'
import { convertCatList, convertPlayLists, convertDetails } from './translate'

export interface PlaylistDetail {
  id: number;
  name: string;
  coverImgUrl: string;
  userId: number;
  nickname: string;
  avatarUrl: string;
  tags: string;
  playCount: number | string;
  subscribedCount: number | string;
  shareCount: number | string;
  trackCount: number;
  commentCount: number;
  createTime: string;
  subDescription: string;
  description: string;
  songs: Song[];
}
const REQUEST_URL = {
  detail: '/playlist/detail',
  comment: '/comment/playlist',
  allCatlist: '/playlist/catlist',
  hotCatlist: '/playlist/hot',
  topPlaylist: '/top/playlist',
  highquality: '/top/playlist/highquality'
}

// 获取热们歌单分类
export const getHotCatLists = () => {
  return getRequest(REQUEST_URL.hotCatlist).then(convertCatList)
}

// 获取歌单分类
export const getAllCatLists = () => {
  return getRequest(REQUEST_URL.allCatlist).then(convertCatList)
}

export const getPlayLists = (cat: string, currentPage: number) => {
  return getRequest(REQUEST_URL.topPlaylist, { cat, limit: PLAYLIST_LIMIT, offset: (currentPage - 1) * PLAYLIST_LIMIT }).then(convertPlayLists)
}

// 精品歌单
export const getBoutiqueLists = (cat: string) => {
  return getRequest(REQUEST_URL.highquality, { cat }).then(convertPlayLists)
}

export const getPlayListDetails = (id: number) => {
  return getRequest(REQUEST_URL.detail, { id }).then(convertDetails)
}

export const getPlayListComments = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.comment, { id, limit: COMMENT_LIMIT, offset: (currentPage - 1) * COMMENT_LIMIT }).then(convertComments)
}

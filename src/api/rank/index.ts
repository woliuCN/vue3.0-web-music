import { getRequest } from '../request'
import { convertRanksInfo, convertRankSongs, converSingerRank } from './translate'
const REQUEST_URL = {
  ranks: '/toplist',
  singerRanks: '/toplist/artist',
  rankSongs: '/playlist/detail'
}

// 获取排行榜前五的歌曲
export const getRankSongs = (id: number) => {
  return getRequest(REQUEST_URL.rankSongs, { id }).then(convertRankSongs)
}

export const getRanksInfo = () => {
  return getRequest(REQUEST_URL.ranks).then(convertRanksInfo)
}

export const getSingerRanks = () => {
  return getRequest(REQUEST_URL.singerRanks).then(converSingerRank)
}

import { AxiosResponse } from 'axios'
import { formatDate, translateCount } from '@/utils/util'
import { getRankSongs, getSingerRanks } from './index'

export const convertRankSongs = (res: AxiosResponse<any>) => {
  const { playlist } = res.data
  if (!playlist) return []
  const songs = []
  const { tracks } = playlist
  for (const track of tracks) {
    if (songs.length === 5) {
      return songs
    }
    songs.push({
      id: track.id,
      name: track.name,
      picUrl: track.al.picUrl,
      artists: track.ar.map((item: Artist) => { return { id: item.id, name: item.name } })
    })
  }
}

export const converSingerRank = (res: AxiosResponse<any>) => {
  const { artists, updateTime } = res.data.list
  if (!artists || !updateTime) return
  const ar = []
  for (let index = 0; index < artists.length; index++) {
    if (ar.length === 5) {
      return {
        artists: ar,
        updateTime
      }
    }
    const artist = artists[index]
    ar.push({
      id: artist.id,
      name: artist.name,
      picUrl: artist.img1v1Url
    })
  }
}

export const convertRanksInfo = async (res: AxiosResponse<any>) => {
  const { list, artistToplist } = res.data
  if (!list) return []
  const commonRanksInfo = []
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    let songs = []
    let backgroundImgUrl = ''
    // 前四个是官方榜单
    if (index < 4) {
      songs = await getRankSongs(item.id)
      backgroundImgUrl = songs[0].picUrl
    }
    commonRanksInfo.push({
      id: item.id,
      coverImgUrl: item.coverImgUrl,
      name: item.name,
      updateTime: formatDate(item.trackUpdateTime, 'MM-dd'),
      playCount: translateCount(item.playCount),
      backgroundImgUrl,
      songs
    })
  }
  const { artists, updateTime } = await getSingerRanks()
  return {
    officalRanks: commonRanksInfo.slice(0, 4),
    globalRanks: commonRanksInfo.slice(4),
    singerRank: {
      coverImgUrl: artistToplist.coverUrl,
      backgroundImgUrl: artists[0].picUrl,
      updateTime: formatDate(updateTime, 'MM-dd'),
      artists
    }
  }
}

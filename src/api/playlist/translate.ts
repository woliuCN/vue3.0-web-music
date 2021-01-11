import { AxiosResponse } from 'axios'
import { getSongs } from '../common'
import { PLAYLIST_LIMIT } from '@/utils/constant'
import { formatTime, formatDate, formatDuration, translateCount } from '@/utils/util'

export const convertDetails = async (res: AxiosResponse<any>) => {
  const { id, name, creator, trackIds, coverImgUrl, createTime, trackCount, playCount, subscribedCount, shareCount, commentCount, tags, description } = res.data.playlist
  const { userId, nickname, avatarUrl } = creator
  const ids = trackIds.map((track: any) => {
    return track.id
  }).join(',')
  const { data } = await getSongs(ids)
  const converSongs: Song[] = data.songs.map((song: any) => {
    return {
      id: song.id,
      name: song.name,
      picUrl: song.al.picUrl,
      alias: song.alia.length ? song.alia.join('/') : '',
      artists: song.ar.map((item: Artist) => { return { id: item.id, name: item.name } }),
      album: { id: song.al.id, name: song.al.name },
      sq: song.st === 0,
      duration: song.dt,
      durationStr: formatDuration(song.dt),
      mvId: song.mv
    }
  })
  return {
    id,
    name,
    coverImgUrl,
    userId,
    nickname,
    avatarUrl,
    tags: tags.join(' / '),
    trackCount,
    commentCount,
    songs: converSongs,
    createTime: formatDate(createTime),
    playCount: translateCount(playCount),
    subscribedCount: translateCount(subscribedCount),
    shareCount: translateCount(shareCount),
    subDescription: description.split('\n')[0],
    description: description.split('\n').slice(1).join('<br/>')
  }
}

export const convertCatList = (res: AxiosResponse<any>) => {
  const { data } = res
  return data
}

export const convertPlayLists = (res: AxiosResponse<any>) => {
  const { playlists, total } = res.data
  const covertPlaylists: PlayListItem [] = playlists.map((list: any) => {
    return {
      id: list.id,
      name: list.name,
      picUrl: list.coverImgUrl,
      playCount: translateCount(list.playCount),
      nickName: list.creator.nickname,
      copywriter: list.copywriter || ''
    }
  })
  return {
    playlists: covertPlaylists,
    total,
    pageCount: total % PLAYLIST_LIMIT ? Math.floor(total / PLAYLIST_LIMIT) + 1 : total / PLAYLIST_LIMIT
  }
}

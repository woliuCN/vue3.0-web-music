import { AxiosResponse } from 'axios'
import { formatDuration } from '@/utils/util'
export const convertSongs = (res: AxiosResponse<any>): Song[] => {
  const { songs } = res.data
  return songs.map((song: any) => {
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
}

export const convertSimiSongs = (res: AxiosResponse<any>): Song[] => {
  const { songs } = res.data
  return songs.map((song: any) => {
    return {
      id: song.id,
      name: song.name,
      picUrl: song.album.picUrl,
      alias: song.alias.length ? song.alias.join('/') : '',
      artists: song.artists.map((item: Artist) => { return { id: item.id, name: item.name } }),
      album: { id: song.album.id, name: song.album.name },
      sq: song.status === 0,
      duration: song.duration,
      durationStr: formatDuration(song.duration),
      mvId: song.mvid
    }
  })
}

function computedTime (timeStr: string) {
  const m = parseInt(timeStr.slice(0, 2))
  const s = parseInt(timeStr.slice(3, 7))
  return m * 60 + s
}
export const convertLyrics = (res: AxiosResponse<any>) => {
  const { lrc } = res.data
  if (!lrc) { return { time: 0, text: '纯音乐请欣赏.....' } }
  const { lyric } = lrc
  const newLyrics = []
  lyric.split('\n').forEach((item: string) => {
    if (item && item.split(']')[1]) {
      newLyrics.push({
        time: computedTime(item.split(']')[0].slice(1)),
        text: item.split(']')[1].trim()
      })
    }
  })
  return newLyrics
}

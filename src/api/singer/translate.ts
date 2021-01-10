import { AxiosResponse } from 'axios'
import { formatDate, formatDuration, translateCount } from '@/utils/util'

export const convertSingers = (res: AxiosResponse<any>) => {
  const { artists, more } = res.data
  const ar = artists.map((artist: any) => {
    return {
      id: artist.id,
      name: artist.name,
      picUrl: artist.img1v1Url
    }
  })
  return {
    singers: ar,
    more
  }
}

export const convertSingerInfo = (res: AxiosResponse<any>) => {
  const { artist, hotSongs } = res.data
  const top50 = hotSongs.map((song: any) => {
    return {
      id: song.id,
      name: song.name,
      picUrl: song.al.picUrl,
      alias: song.alia.length ? song.alia.join('/') : '',
      artists: song.ar.map((item: Artist) => { return { id: item.id, name: item.name } }),
      album: { id: song.al.id, name: song.al.name },
      sq: song.st === 1,
      duration: song.dt,
      durationStr: formatDuration(song.dt),
      mvId: song.mv
    }
  })
  const singerInfo = {
    id: artist.id,
    name: artist.name,
    picUrl: artist.img1v1Url,
    musicSize: artist.musicSize,
    albumSize: artist.albumSize,
    mvSize: artist.mvSize
  }

  return {
    singerInfo,
    top50
  }
}

export const convertAlbum = (res: AxiosResponse<any>) => {
  const { hotAlbums } = res.data
  return hotAlbums.map((album: any) => {
    return {
      id: album.id,
      name: album.name,
      picUrl: album.picUrl,
      publishTime: formatDate(album.publishTime)
    }
  })
}

export const convertAlbumSong = (res: AxiosResponse<any>) => {
  const { songs } = res.data
  return songs.map((song: any) => {
    return {
      id: song.id,
      name: song.name,
      picUrl: song.al.picUrl,
      alias: song.alia.length ? song.alia.join('/') : '',
      artists: song.ar.map((item: Artist) => { return { id: item.id, name: item.name } }),
      album: { id: song.al.id, name: song.al.name },
      sq: song.st === 1,
      duration: song.dt,
      durationStr: formatDuration(song.dt),
      mvId: song.mv
    }
  })
}

export const convertIntro = (res: AxiosResponse<any>) => {
  const { introduction, briefDesc } = res.data
  if (!introduction || !introduction.length) {
    return [{
      title: '歌手简介',
      textArr: [briefDesc]
    }]
  }
  return introduction.map((item: any) => {
    return {
      title: item.ti,
      textArr: item.txt.split('\n')
    }
  })
}

export const convertMv = (res: AxiosResponse<any>): Mv[] => {
  const { mvs } = res.data
  if (!mvs || !mvs.length) return
  return mvs.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.imgurl16v9,
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      playCount: translateCount(item.playCount)
    }
  })
}

export const convertSimiSinger = (res: AxiosResponse<any>): Artist[] => {
  const { artists } = res.data
  if (!artists || !artists.length) return
  return artists.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.img1v1Url
    }
  })
}

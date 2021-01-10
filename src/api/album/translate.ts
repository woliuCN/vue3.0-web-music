import { formatDate, formatDuration, translateCount } from '@/utils/util'
import { AxiosResponse } from 'axios'
import { getAlbumAllCount } from '.'

export const convertDetails = async (res: AxiosResponse<any>) => {
  const { songs, album } = res.data
  const converSongs: Song[] = songs.map((song: any) => {
    return {
      id: song.id,
      name: song.name,
      picUrl: song.al.picUrl,
      alias: song.alia.length ? song.alia.join('/') : '',
      artists: song.ar.map((item: Artist) => { return { id: item.id, name: item.name } }),
      album: { id: song.al.id, name: song.al.name },
      sq: song.privilege.st === 0,
      duration: song.dt,
      durationStr: formatDuration(song.dt),
      mvId: song.mv
    }
  })
  const { data: { shareCount, subCount } } = await getAlbumAllCount(album.id)
  return {
    id: album.id,
    name: album.name,
    artistId: album.artist.id,
    artistName: album.artist.name,
    publishTime: formatDate(album.publishTime),
    subscribedCount: translateCount(subCount),
    shareCount: translateCount(shareCount),
    coverImgUrl: album.picUrl,
    description: album.description.split('\n'),
    songs: converSongs
  }
}

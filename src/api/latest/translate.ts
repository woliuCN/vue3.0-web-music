import { AxiosResponse } from 'axios'
import { formatDuration } from '@/utils/util'

export const convertTopSongs = (res: AxiosResponse<any>): Song[] => {
  const { data } = res.data
  if (!data || !data.length) return
  return data.map((item: any) => {
    const { album, artists, duration, alias } = item
    return {
      id: item.id,
      name: item.name,
      picUrl: album.picUrl,
      alias: alias[0] || '',
      mvId: item.mvid,
      album: { id: album.id, name: album.name },
      artists: artists.map((item: Artist) => { return { id: item.id, name: item.name } }),
      duration: duration,
      durationStr: formatDuration(duration),
      sq: album.status === 0
    }
  })
}

import { AxiosResponse } from 'axios'
import { translateCount, formatDuration } from '@/utils/util'
interface Banner {
    imageUrl: string;
    [propName: string]: any;
}

export const convertBanners = (res: AxiosResponse<any>) => {
  return res.data.banners.map((banner: Banner) => {
    return banner.imageUrl
  })
}

export const convertPlayLists = (res: AxiosResponse<any>) => {
  return res.data.result.map((playListItem: PlayListItem) => {
    return {
      id: playListItem.id,
      name: playListItem.name,
      picUrl: playListItem.picUrl,
      playCount: translateCount(playListItem.playCount as number)
    }
  })
}

export const convertOwnerSendLists = (res: AxiosResponse<any>) => {
  return res.data.result.map((ownerSendItem: OwnerSendItem) => {
    return {
      id: ownerSendItem.id,
      name: ownerSendItem.name,
      picUrl: ownerSendItem.picUrl
    }
  })
}

export const convertLatestSongLists = (res: AxiosResponse<any>): Song[] => {
  return res.data.result.map((item: any) => {
    const { song } = item
    const { album, artists, duration } = song
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      alias: album.transName || '',
      mvId: song.mvid,
      album: { id: album.id, name: album.name },
      artists: artists.map((item: Artist) => { return { id: item.id, name: item.name } }),
      duration: duration,
      durationStr: formatDuration(duration),
      sq: album.status === 0
    }
  })
}

export const convertMvLists = (res: AxiosResponse<any>): Mv[] => {
  return res.data.result.map((item: Mv) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      duration: item.duration,
      artistId: item.artistId,
      artistName: item.artistName,
      playCount: translateCount(item.playCount)
    }
  })
}

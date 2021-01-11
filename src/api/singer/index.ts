import { getRequest } from '../request'
import { SINGER_LIMIT } from '@/utils/constant'
import { convertAlbum, convertAlbumSong, convertSingerInfo, convertSingers, convertIntro, convertMv, convertSimiSinger } from './translate'
const REQUEST_URL = {
  singerLists: '/artist/list',
  singerInfo: '/artists',
  singerAlbums: '/artist/album',
  singerIntro: '/artist/desc',
  singerMvs: '/artist/mv',
  simiSingers: '/simi/artist',
  albumSongs: '/album'
}
export const getSingerLists = (type: number, area: number, initial: string, currentPage: number) => {
  return getRequest(REQUEST_URL.singerLists, { type, area, initial, limit: SINGER_LIMIT, offset: (currentPage - 1) * SINGER_LIMIT }).then(convertSingers)
}

export const getSingerAlbums = (id: number) => {
  return getRequest(REQUEST_URL.singerAlbums, { id }).then(convertAlbum)
}

export const getAlbumSongs = (id: number) => {
  return getRequest(REQUEST_URL.albumSongs, { id }).then(convertAlbumSong)
}

export const getSingerInfo = (id: number) => {
  return getRequest(REQUEST_URL.singerInfo, { id }).then(convertSingerInfo)
}

export const getSingerIntro = (id: number) => {
  return getRequest(REQUEST_URL.singerIntro, { id }).then(convertIntro)
}

export const getSingerMvs = (id: number) => {
  return getRequest(REQUEST_URL.singerMvs, { id, limit: 999 }).then(convertMv)
}

export const getSimiSingers = (id: number) => {
  return getRequest(REQUEST_URL.simiSingers, { id }).then(convertSimiSinger)
}

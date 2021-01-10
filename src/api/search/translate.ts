import { AxiosResponse } from 'axios'
import { formatDuration, translateCount } from '@/utils/util'
import { SEARCH_TYPE } from '@/utils/constant'

export const convertSearchSuggest = (res: AxiosResponse<any>) => {
  const { result } = res.data
  if (!result) return
  let { albums, songs, artists, playlists } = result
  albums = albums && albums.length && albums.map((album) => {
    return {
      id: album.id,
      name: album.name,
      artist: album.artist.name || ''
    }
  })

  songs = songs && songs.length && songs.map((song) => {
    return {
      id: song.id,
      name: song.name,
      artist: song.artists.map((item) => { return item.name }).join(' ')
    }
  })
  artists = artists && artists.length && artists.map((artist) => {
    return {
      id: artist.id,
      name: artist.name
    }
  })

  playlists = playlists && playlists.length && playlists.map((playlist) => {
    return {
      id: playlist.id,
      name: playlist.name
    }
  })

  return {
    albums: albums || [],
    songs: songs || [],
    artists: artists || [],
    playlists: playlists || []
  }
}

export const convertSearchInfo = (res: AxiosResponse<any>, type: string) => {
  const { result } = res.data
  switch (type) {
    case 'songs': {
      const songs: Song[] = result.songs.map((song: any) => {
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
        songs,
        total: result.songCount,
        pageCount: result.songCount % SEARCH_TYPE[type].limit ? Math.floor(result.songCount / SEARCH_TYPE[type].limit) + 1 : result.songCount / SEARCH_TYPE[type].limit
      }
    }
    case 'artists': {
      const artists: Artist[] = result.artists.map((artist: any) => {
        return {
          id: artist.id,
          name: artist.name,
          picUrl: artist.picUrl
        }
      })
      return {
        artists,
        total: result.artistCount,
        pageCount: result.artistCount % SEARCH_TYPE[type].limit ? Math.floor(result.artistCount / SEARCH_TYPE[type].limit) + 1 : result.artistCount / SEARCH_TYPE[type].limit
      }
    }
    case 'albums': {
      const albums: Album[] = result.albums.map((album: any) => {
        return {
          id: album.id,
          name: album.name,
          picUrl: album.picUrl,
          artist: album.artist.name
        }
      })
      return {
        albums,
        total: result.albumCount,
        pageCount: result.albumCount % SEARCH_TYPE[type].limit ? Math.floor(result.albumCount / SEARCH_TYPE[type].limit) + 1 : result.albumCount / SEARCH_TYPE[type].limit
      }
    }
    case 'playlists': {
      const playlists = result.playlists.map((playlist: any) => {
        return {
          id: playlist.id,
          name: playlist.name,
          coverImgUrl: playlist.coverImgUrl,
          trackCount: playlist.trackCount,
          nickName: playlist.creator.nickname
        }
      })
      return {
        playlists,
        total: result.playlistCount,
        pageCount: result.playlistCount % SEARCH_TYPE[type].limit ? Math.floor(result.playlistCount / SEARCH_TYPE[type].limit) + 1 : result.playlistCount / SEARCH_TYPE[type].limit
      }
    }
    case 'videos': {
      const videos = result.videos.map((video: any) => {
        return {
          id: video.vid,
          name: video.title,
          coverUrl: video.coverUrl,
          durationStr: formatDuration(video.durationms),
          playCount: translateCount(video.playTime),
          nickName: video.creator.map((creator) => { return creator.userName }).join('/')
        }
      })
      return {
        videos,
        total: result.videoCount,
        pageCount: result.videoCount % SEARCH_TYPE[type].limit ? Math.floor(result.videoCount / SEARCH_TYPE[type].limit) + 1 : result.videoCount / SEARCH_TYPE[type].limit
      }
    }
    default:
      break
  }
}

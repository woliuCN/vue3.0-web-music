import { ref } from 'vue'
import { getSearchSuggest } from '@/api/search'
export default function useCommonSearch (keyWords, isFocus, $router) {
  const searchLists = ref({
    songs: [],
    albums: [],
    playlists: [],
    artists: []
  })
  const getSearchList = async () => {
    if (!keyWords.value) return
    searchLists.value = await getSearchSuggest(keyWords.value)
  }
  const handleShowDetail = (url: string) => {
    isFocus.value = false
    $router.push(url)
  }
  const renderSearchList = () => {
    return <div class="search-list">
      <header class="title">搜"<span>{keyWords.value}</span>"相关结果{'>'} </header>
      {
        searchLists.value.songs.length ? (
          <>
            <h1 class="sub-title"><i class="iconfont icon-single"></i><span>单曲</span></h1>
            {searchLists.value.songs.map(song => <div class="search-item">{song.name}- {song.artist}</div>)}
          </>
        ) : null
      }
      {
        searchLists.value.artists.length ? (
          <>
            <h1 class="sub-title"><i class="iconfont icon-user"></i><span>歌手</span></h1>
            {searchLists.value.artists.map(artist => <div class="search-item" onClick={() => handleShowDetail(`/singer/${artist.id}`) }>{artist.name}</div>)}
          </>
        ) : null
      }
      {
        searchLists.value.albums.length ? (
          <>
            <h1 class="sub-title"><i class="iconfont icon-album"></i><span>专辑</span></h1>
            {searchLists.value.albums.map(album => <div class="search-item" onClick={() => handleShowDetail(`/album/${album.id}`) }>{album.name}-{album.artist}</div>)}
          </>
        ) : null
      }
      {
        searchLists.value.playlists.length ? (
          <>
            <h1 class="sub-title"><i class="iconfont icon-playlist"></i><span>歌单</span></h1>
            {searchLists.value.playlists.map(playlist => <div class="search-item" onClick={() => handleShowDetail(`/playList/${playlist.id}`) }>{playlist.name}</div>)}
          </>
        ) : null
      }
    </div>
  }
  return {
    getSearchList,
    renderSearchList
  }
}

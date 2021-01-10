import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import './index.scss'
import { themeStore } from '@/store/modules/theme'
import { getHotSearchLists, getSearchSuggest } from '@/api/search'
import { debounce } from '@/utils/util'
import { useRouter } from 'vue-router'
interface HotList {
  searchWord: string;
  score: number;
  content: string;
  iconUrl: string;
  [propsName: string]: any;
}
export default defineComponent({
  setup () {
    const $router = useRouter()
    const themeType = computed(() => themeStore.themeType)
    const keyWords = ref<string>('')
    const isFocus = ref<boolean>(false)
    const hotSearchLists = ref<HotList[]>([])
    const searchLists = ref({
      songs: [],
      albums: [],
      playlists: [],
      artists: []
    })
    const getHotLists = async () => {
      const { data } = await getHotSearchLists()
      hotSearchLists.value = data.data
    }
    watch(keyWords, () => {
      handleInputChange()
    })
    const handleInputChange = debounce(() => {
      getSearchList()
    }, 300)
    const getSearchList = async () => {
      if (!keyWords.value) return
      searchLists.value = await getSearchSuggest(keyWords.value)
    }
    const handeShowSearchInfo = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        isFocus.value = false
        $router.push(`/search/${keyWords.value}`)
      }
    }
    onMounted(() => {
      getHotLists()
    })
    // 渲染热搜列表
    const renderHotSearchList = () => {
      return <div class="hot-list">
        <h1 class="title">热搜榜</h1>
        <ul>
          {hotSearchLists.value.map((item, index) => {
            return <li class="list-item" onClick={() => { keyWords.value = item.searchWord; isFocus.value = false; $router.push(`/search/${keyWords.value}`) }}>
              <div class={`index ${index + 1 > 3 ? '' : 'red'}`} > {index + 1} </div>
              <div class="content">
                <div class="header">
                  <span class={`word ${index + 1 > 3 ? '' : 'bold'}`} > {item.searchWord}</span>
                  {item.iconUrl ? <img src={item.iconUrl} /> : null}
                  <span class="scope">{item.score}</span>
                </div>
                <div class="desc">
                  {item.content}
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
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
              {searchLists.value.artists.map(artist => <div class="search-item" onClick={() => { isFocus.value = false; $router.push(`/singer/${artist.id}`) }}>{artist.name}</div>)}
            </>
          ) : null
        }
        {
          searchLists.value.albums.length ? (
            <>
              <h1 class="sub-title"><i class="iconfont icon-album"></i><span>专辑</span></h1>
              {searchLists.value.albums.map(album => <div class="search-item" onClick={() => { isFocus.value = false; $router.push(`/album/${album.id}`) }}>{album.name}-{album.artist}</div>)}
            </>
          ) : null
        }
        {
          searchLists.value.playlists.length ? (
            <>
              <h1 class="sub-title"><i class="iconfont icon-playlist"></i><span>歌单</span></h1>
              {searchLists.value.playlists.map(playlist => <div class="search-item" onClick={() => { isFocus.value = false; $router.push(`/playList/${playlist.id}`) }}>{playlist.name}</div>)}
            </>
          ) : null
        }
      </div>
    }
    const directives = { value: () => { isFocus.value = false }, arg: 'search_input' }
    return () => (
      <div class="search">
        <input
          id="search_input"
          type="text"
          placeholder="搜索"
          v-model={keyWords.value}
          class={`search-input ${themeType.value}-cl-primary_3 ${themeType.value}-bg-primary_4`}
          onFocus={() => { isFocus.value = true }}
          onKeyup={handeShowSearchInfo}
        />
        <i class="iconfont icon-search"></i>
        { isFocus.value
          ? <div class="list-container" v-outside={directives}>
            {keyWords.value
              ? renderSearchList()
              : renderHotSearchList()
            }
          </div>
          : null
        }
      </div>
    )
  }
})

import PlayListItem from '@/components/playlist-item/Index.vue'
import Pagin from '@/components/pagin/Index.vue'
import styles from './Index.module.scss'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getHotCatLists, getAllCatLists, getPlayLists } from '@/api/playlist/index'
import { playlistStore } from '@/store/modules/playlist'
export default defineComponent({
  components: {
    PlayListItem,
    Pagin
  },
  setup () {
    const PLAYLIST_LIMIT = 100
    const isShowAll = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    const activeCat = computed(() => playlistStore.activeCat)
    const paginData = reactive({
      currentPage: 1,
      pageCount: 0
    })
    const category = reactive({
      hotCategory: {
        tags: []
      },
      allCategory: {
        all: {},
        categories: {},
        sub: []
      }
    })
    const currentPlaylists = ref<PlayListItem[]>([])
    const currentBoutiquelists = computed<PlayListItem[]>(() => playlistStore.currentBoutiquelists)
    const $router = useRouter()
    const handleToggleAllList = () => {
      isShowAll.value = !isShowAll.value
    }
    const handleChangeCat = (newCat = '') => {
      playlistStore.CHANGE_ACTIVECAT(newCat)
      getPlaylists()
    }
    const renderCategoryList = () => {
      const categories: Array<string> = Object.values(category.allCategory.categories)
      const iconArray: Array<string> = ['icon-languages', 'icon-style', 'icon-scene', 'icon-emotional', 'icon-theme-list']
      return categories.map((item: string, i: number) => (
        <li class={styles.categoryItem} key={'category' + i}>
          <div class={styles.categoryItemLeft}>
            <i class={`iconfont ${iconArray[i]}`}></i>
            <span>{item}</span>
          </div>
          <div class={styles.categoryItemRight}>
            {renderCategoryListItem(i)}
          </div>
        </li>
      ))
    }
    const renderCategoryListItem = (key: number) => {
      const list = category.allCategory.sub.filter(item => {
        return item.category === key
      })
      return list.map((item) => {
        return <div>
          <span
            class={`${item.name === activeCat.value ? styles.active : ''} ${item.hot ? styles.hot : ''}`}
            key={item.name}
            onClick={() => handleChangeCat(item.name)}
          >
            {item.name}
          </span>
        </div>
      })
    }
    // 热门列表
    const renderHotCategory = () => {
      return category.hotCategory.tags.map((item: any) => (
        <span
          class={`${styles.hotCategoryTag} ${item.name === activeCat.value ? styles.active : ''}`}
          key={item.id}
          onClick={() => handleChangeCat(item.name)}
        >
          {item.name}
        </span>
      ))
    }

    const renderPlayList = () => {
      return currentPlaylists.value.map((playlistItem) => (
        <play-list-item playListItem={playlistItem} />
      ))
    }
    const handlePaginChange = (cur: number) => {
      paginData.currentPage = cur
      getPlaylists()
    }

    const getPlaylists = async () => {
      isLoading.value = true
      playlistStore.getBoutiquelists(activeCat.value)
      const { playlists, total } = await getPlayLists(activeCat.value, paginData.currentPage)
      currentPlaylists.value = playlists
      paginData.pageCount = Math.floor(total / PLAYLIST_LIMIT) + 1
      isLoading.value = false
    }

    const handleShowBoutiqueList = () => {
      $router.push('/boutiqueList')
    }

    const init = async () => {
      const hotCategory = await getHotCatLists()
      const allCategory = await getAllCatLists()
      category.hotCategory = hotCategory
      category.allCategory = allCategory
      await getPlaylists()
    }
    onMounted(() => {
      init()
    })
    const directives = { value: () => { isShowAll.value = false }, arg: 'playlist_all' }

    return () => (
      <div class={styles.playlist} v-loading={isLoading.value}>
        {
          currentBoutiquelists.value.length
            ? (
              <header class={styles.recommendBoutique} onClick={handleShowBoutiqueList}>
                <div class={styles.decorator} style={{ background: `url(${currentBoutiquelists.value[0].picUrl})` }}></div>
                <div class={styles.mask}></div>
                <div class={styles.desc}>
                  <img src={currentBoutiquelists.value[0].picUrl}></img>
                  <div class={styles.info}>
                    <div class={styles.infoTag}>
                      <i class="iconfont icon-choiceness"></i>
                      <span>精品歌单</span>
                    </div>
                    <div class={styles.infoName}>{currentBoutiquelists.value[0].name}</div>
                    <div class={styles.infoCopyWrite}>{currentBoutiquelists.value[0].copywriter}</div>
                  </div>
                </div>
              </header>
            ) : null
        }
        <main class={styles.main}>
          <div class={styles.mainHeader}>
            <div class={styles.category}>
              <div id="playlist_all" class={styles.categoryBtn} onClick={handleToggleAllList}><span>全部歌单</span><i class="iconfont icon-right"></i></div>
              <ul v-outside={directives} style={{ display: isShowAll.value ? 'block' : 'none' }} class={styles.categoryList}>
                <li class={`${styles.categoryItem} ${styles.all}`}>
                  <span class={`${activeCat.value === '' ? styles.active : ''}`} onClick={() => handleChangeCat()}>
                    全部歌单
                  </span>
                </li>
                {renderCategoryList()}
              </ul>
            </div>
            <div class={styles.hotCategory}>
              {renderHotCategory()}
            </div>
          </div>
          <div class={styles.mainContent}>
            {renderPlayList()}
          </div>
          <Pagin pagerCount={9} pageCount={paginData.pageCount} currentPage={paginData.currentPage} onChange={handlePaginChange} />
        </main>
      </div>
    )
  }
})

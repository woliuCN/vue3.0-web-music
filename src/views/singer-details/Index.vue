<template>
  <div class="details" v-loading="isLoading">
    <div class="details-top">
      <img class="top-cover" :src="singerInfo.picUrl" />
      <div class="top-content">
        <h1 class="content-title">
          {{ singerInfo.name }}
        </h1>
        <div class="content-options">
          <div class="options-item">
            <i class="iconfont icon-player-collect"></i>
            <span>收藏</span>
          </div>
          <div class="options-item">
            <i class="iconfont icon-singer-user"></i>
            <span>个人主页</span>
          </div>
        </div>
        <div class="content-count">
          <span class="label">单曲数 : </span> {{ singerInfo.musicSize }} &nbsp;
          <span class="label">专辑数 : </span> {{ singerInfo.albumSize }} &nbsp;
          <span class="label">MV数 : </span> {{ singerInfo.mvSize }} &nbsp;
        </div>
      </div>
    </div>
    <div class="details-bottom">
      <tabs v-model="activeName">
        <tab-pane label="专辑" name="album">
          <Album :album="hotAlbum" />
          <Album v-for="album in albums" :album="album" :key="album.id" />
        </tab-pane>
        <tab-pane label="MV" name="mv">
          <div class="mv-container">
            <div class="mv-item" v-for="item in mvs" :key="item.id">
              <mv-item :mvItem="item" />
            </div>
          </div>
        </tab-pane>
        <tab-pane label="歌手详情" name="intro">
          <div
            v-for="(item, index) in intro"
            :key="'intro-' + index"
            style="margin-bottom: 40px;"
          >
            <h1 class="intro-title">{{ item.title }}</h1>
            <p
              class="intro-text"
              v-for="(text, index) in item.textArr"
              :key="'text-' + index"
            >
              {{ text }}
            </p>
          </div>
        </tab-pane>
        <tab-pane label="相似歌手" name="simi">
          <div class="simi-singer">
            <div
              class="singer-item"
              v-for="item in simiSingers"
              :key="item.id"
              @click="handleShowSimi(item.id)"
            >
              <img :src="item.picUrl" />
              <p>{{ item.name }}</p>
            </div>
          </div>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
import Album from './components/Album.vue'
import MvItem from '@/components/mv-item/Index.vue'
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRefs,
  nextTick
} from 'vue'
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
  useRouter
} from 'vue-router'
import {
  getSingerInfo,
  getSingerAlbums,
  getAlbumSongs,
  getSingerMvs,
  getSingerIntro,
  getSimiSingers
} from '@/api/singer/index'
export default defineComponent({
  components: {
    Album,
    MvItem
  },
  setup () {
    const activeName = ref<string>('album')
    const isLoading = ref<boolean>(false)
    const data = reactive({
      singerInfo: {},
      hotAlbum: {},
      albums: [],
      intro: [],
      mvs: [],
      simiSingers: []
    })
    const $router = useRouter()
    const $route = useRoute()
    const handleShowSimi = (id: number) => {
      $router.push(`/singer/${id}`)
    }
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      nextTick(() => {
        activeName.value = 'album'
        init(Number(to.params.id))
      })
    })
    const init = async (id: number) => {
      isLoading.value = true
      const { top50, singerInfo } = await getSingerInfo(id)
      data.singerInfo = singerInfo
      data.hotAlbum = { name: '热门50首', songs: top50, isTop: true }
      data.intro = await getSingerIntro(id)
      data.mvs = await getSingerMvs(id)
      data.simiSingers = await getSimiSingers(id)
      const albums = await getSingerAlbums(id)
      for (let index = 0; index < albums.length; index++) {
        const album = albums[index]
        const songs = await getAlbumSongs(album.id)
        album.songs = songs
      }
      data.albums = albums
      isLoading.value = false
    }
    onMounted(async () => {
      const id = Number($route.params.id)
      init(id)
    })
    return {
      activeName,
      isLoading,
      ...toRefs(data),
      handleShowSimi
    }
  }
})
</script>

<style scoped lang="scss">
/deep/.tabs-header,
/deep/.tab-pane {
  padding: 0 2.5%;
}

.details {
  .details-top {
    display: flex;
    align-items: flex-start;
    padding: 2% 2.5%;

    .top-cover {
      flex: 0 0 auto;
      width: 184px;
      height: 184px;
      margin-right: 20px;
      border: 1px solid #ccc;
    }

    .top-content {
      flex: 1;

      .content-title {
        font-size: 23px;
        font-weight: bold;
      }

      .content-options {
        display: flex;
        align-items: center;
        margin: 16px 0;
        font-size: 14px;
        color: #444;

        .options-item {
          display: flex;
          align-items: center;
          padding: 4px 14px;
          margin-right: 10px;
          cursor: pointer;
          border: 1px solid #e1e1e1;
          border-radius: 25px;

          .iconfont {
            margin-right: 4px;
            font-size: 22px;
            color: #444;
          }
        }
      }

      .content-count {
        font-size: 13px;
        line-height: 2;
        color: #555;

        .label {
          color: #444;
        }
      }
    }
  }

  .mv-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .mv-item {
      flex: 0 0 23.5%;
      margin-right: 2%;
      margin-bottom: 20px;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .intro-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 2;
  }

  .intro-text {
    font-size: 14px;
    line-height: 2;
    color: #666;
    text-indent: 2em;
  }

  .simi-singer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .singer-item {
      flex: 0 0 18%;
      margin-right: 2.5%;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.5;
      color: #666;
      cursor: pointer;

      > img {
        width: 100%;
      }

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>

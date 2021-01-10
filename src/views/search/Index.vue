<template>
  <div v-loading="isLoading">
    <header class="search-header">找到 {{ total }} {{ typeToZh }}</header>
    <div class="search-content">
      <tabs v-model="activeName" :labelSize="14" @tab-click="handleTabChange">
        <tab-pane label="单曲" name="songs">
          <song-list :songs="songs" />
          <pagin
            style="margin: 10px 0;"
            :pageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </tab-pane>
        <tab-pane label="歌手" name="artists">
          <div class="artist" v-for="artist in artists" :key="artist.id" @click="handleShowDetail(`/singer/${artist.id}`)">
            <div class="artist-info">
              <img :src="artist.picUrl" />
              <span>{{ artist.name }}</span>
            </div>
            <i class="iconfont icon-user"></i>
          </div>
          <pagin
            style="margin: 10px 0;"
            :pageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </tab-pane>
        <tab-pane label="专辑" name="albums">
          <div class="album" v-for="album in albums" :key="album.id" @click="handleShowDetail(`/album/${album.id}`)">
            <img :src="album.picUrl" />
            <span class="album-name">{{ album.name }}</span>
            <span class="album-artist">{{ album.artist }}</span>
          </div>
          <pagin
            style="margin: 10px 0;"
            :pageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </tab-pane>
        <tab-pane label="视频" name="videos">
          <div class="videos">
            <div class="video" v-for="video in videos" :key="video.id" @click="handleShowDetail(`/video/${video.id}`, true)">
              <div class="video-cover">
                <img
                  :src="video.coverUrl"
                />
                <div class="cover-count">
                  <i class="iconfont icon-playlist-play"></i>
                  <span>{{video.playCount}}</span>
                </div>
                <div class="cover-duration">{{video.durationStr}}</div>
              </div>
              <div>
                <p class="name">{{video.name}}</p>
                <div class="creator">by {{video.nickName}}</div>
              </div>
            </div>
          </div>
          <pagin
            style="margin: 10px 0;"
            :pageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </tab-pane>
        <tab-pane label="歌单" name="playlists">
          <div
            class="playlist"
            v-for="playlist in playlists"
            :key="playlist.id"
            @click="handleShowDetail(`/platList/${playlist.id}`)"
          >
            <img :src="playlist.coverImgUrl" />
            <span class="playlist-name">{{ playlist.name }}</span>
            <span class="playlist-count">{{ playlist.trackCount }}首</span>
            <span class="playlist-artist">
              <span style="color: #aaa;">by</span>
              {{ playlist.nickName }}
            </span>
          </div>
          <pagin
            style="margin: 10px 0;"
            :pageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
import SongList from '@/components/song-list/Index.vue'
import { defineComponent, reactive, ref, toRefs, computed } from 'vue'
import { getSearchInfo } from '@/api/search/index'
import { useRoute, useRouter, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router'
import { SEARCH_TYPE } from '@/utils/constant'
import { playerStore } from '@/store/modules/player'
export default defineComponent({
  components: {
    SongList
  },
  setup () {
    const $route = useRoute()
    const $router = useRouter()
    const activeName = ref<string>('songs')
    const isLoading = ref<boolean>(false)
    const searchInfo = reactive({
      songs: [],
      albums: [],
      playlists: [],
      artists: [],
      videos: []
    })
    const pageData = reactive({
      currentPage: 1,
      pageCount: 0,
      total: 0
    })
    const typeToZh = computed(() => SEARCH_TYPE[activeName.value].resName)
    const _getSearchInfo = async (keyWords: string) => {
      isLoading.value = true
      const res = await getSearchInfo(
        keyWords,
        activeName.value,
        pageData.currentPage
      )
      searchInfo[activeName.value] = res[activeName.value]
      pageData.pageCount = res.pageCount
      pageData.total = res.total
      isLoading.value = false
    }

    const handlePaginChange = (currentPage: number) => {
      pageData.currentPage = currentPage
      _getSearchInfo($route.params.keyWords as string)
    }
    const handleTabChange = () => {
      pageData.currentPage = 1
      _getSearchInfo($route.params.keyWords as string)
    }
    const handleShowDetail = (url: string, stop: boolean) => {
      if (stop) {
        playerStore.CHANGE_PLAYING(false)
      }
      $router.push(url)
    }
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      pageData.currentPage = 1
      _getSearchInfo(to.params.keyWords as string)
    })
    _getSearchInfo($route.params.keyWords as string)
    return {
      activeName,
      typeToZh,
      isLoading,
      handlePaginChange,
      handleTabChange,
      handleShowDetail,
      ...toRefs(searchInfo),
      ...toRefs(pageData)
    }
  }
})
</script>

<style scoped lang="scss">
/deep/.tabs-header {
  padding: 0 2.5%;
  border-bottom: 1px solid #f1f1f1;

  .tabs-nav {
    height: 40px;
  }
}

/deep/.tabs-nav .tabs-nav-item.active {
  &::after {
    width: 0;
  }
}

.search-header {
  padding: 2% 2.5%;
  font-size: 17px;
  font-weight: bold;
}

.artist {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .artist-info {
    display: flex;
    align-items: center;

    > img {
      width: 64px;
      margin-right: 10px;
      border: 1px solid #f1f1f1;
    }
  }

  .icon-user {
    padding: 2px;
    font-size: 14px;
    color: #fff;
    background: #ed4141;
    border-radius: 50%;
  }
}

.album {
  > img {
    width: 64px;
    margin-right: 10px;
    border: 1px solid #f1f1f1;
  }

  .album-name {
    flex: 0 0 450px;
  }

  .album-artist {
    flex: 1;
    font-size: 12px;
    color: #666;
  }
}

.playlist {
  > img {
    width: 64px;
    margin-right: 10px;
    border: 1px solid #f1f1f1;
  }

  .playlist-name {
    flex: 0 0 400px;
  }

  .playlist-count {
    flex: 0 0 200px;
    font-size: 12px;
    color: #666;
  }

  .playlist-artist {
    flex: 1;
    font-size: 12px;
    color: #444;
  }
}

.artist,
.album,
.playlist {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;

  &:nth-child(even) {
    background: #f8f8f8;
  }

  &:hover {
    background: #f1f1f1;
  }
}

.videos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 2% 2.5%;

  .video {
    flex: 0 0 23.5%;
    margin-right: 2%;
    margin-bottom: 20px;
    font-size: 12px;
    cursor: pointer;

    .video-cover {
      position: relative;
      width: 100%;
      margin-bottom: 5px;

      > img {
        width: 100%;
        border-radius: 4px;
      }

      .cover-count {
        position: absolute;
        top: 4px;
        right: 10px;
        display: flex;
        align-items: center;
        color: #fff;
      }

      .cover-duration {
        position: absolute;
        right: 8px;
        bottom: 6px;
        color: #fff;
      }
    }

    .name,.creator {
        line-height: 1.5;
        @include multipleNoWrap(1);
    }

    .creator {
        color: #ddd;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>

<template>
  <div class="recommend" v-loading="isLoading">
    <Banners v-if="banners.length" :banners="banners"/>
    <h1 class="subtitle" @click="handleShowMore('/playList')">
      <span>推荐歌单</span>
      <i class="iconfont icon-right"></i>
    </h1>
    <div class="recommend-playlist">
      <play-list-item v-for="item in playLists" :playListItem="item" :key="item.id"/>
    </div>
    <h1 class="subtitle">
      <span>独家放送</span>
      <i class="iconfont icon-right"></i>
    </h1>
    <div class="recommend-ownersend">
      <owner-send-item v-for="item in ownerSendLists" :ownerSendItem="item" :key="item.id" />
    </div>
    <h1 class="subtitle" @click="handleShowMore('/newMusic')">
      <span>最新音乐</span>
      <i class="iconfont icon-right"></i>
    </h1>
    <div class="recommend-latestmusic">
      <latest-music-item v-for="(item, index) in LatestSongLists" :latestMusicItem="item" :key="item.id" @play="handlePlaySong(index)"/>
    </div>
    <h1 class="subtitle" @click="handleShowMore('/mvList')">
      <span>推荐MV</span>
      <i class="iconfont icon-right"></i>
    </h1>
    <div class="recommend-mv">
      <div v-for="item in recomendMvLists.slice(0,3)"  :key="item.id"  style="flex: 0 0 32%;">
        <mv-item :mvItem="item"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Banners from '@/components/banners/Index.vue'
import PlayListItem from '@/components/playlist-item/Index.vue'
import MvItem from '@/components/mv-item/Index.vue'
import OwnerSendItem from './components/OwnerSendItem.vue'
import LatestMusicItem from './components/LatestMusicItem.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { getBanners, getRecommendPlayLists, getOwnerSendLists, getLatestSongLists, getRecommendMvLists } from '@/api/recommend/index'
import { useRouter } from 'vue-router'
import { playerStore } from '@/store/modules/player'
export default defineComponent({
  components: {
    Banners,
    PlayListItem,
    MvItem,
    OwnerSendItem,
    LatestMusicItem
  },
  setup () {
    const isLoading = ref<boolean>(false)
    const banners = ref<string[]>([])
    const playLists = ref<PlayListItem[]>([])
    const ownerSendLists = ref<OwnerSendItem[]>([])
    const LatestSongLists = ref<Song[]>([])
    const recomendMvLists = ref<Mv[]>([])
    const $router = useRouter()
    const init = async () => {
      isLoading.value = true
      try {
        banners.value = await getBanners()
        playLists.value = await getRecommendPlayLists()
        ownerSendLists.value = await getOwnerSendLists()
        LatestSongLists.value = await getLatestSongLists()
        recomendMvLists.value = await getRecommendMvLists()
      } catch (error) {
        console.error(error)
      }
      isLoading.value = false
    }
    const handleShowMore = (url: string) => {
      $router.push(url)
    }
    const handlePlaySong = (index: number) => {
      playerStore.CHANGE_CURRENTINDEX(index)
      playerStore.CHANGE_CURRENTSONGS_STACK(LatestSongLists.value)
    }
    onMounted(() => {
      init()
    })
    return {
      isLoading,
      banners,
      playLists,
      ownerSendLists,
      LatestSongLists,
      recomendMvLists,
      handleShowMore,
      handlePlaySong
    }
  }
})
</script>

<style lang="scss" scoped>
.recommend {
  .subtitle {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    cursor: pointer;

    .icon-right {
      font-weight: initial;
    }
  }

  .recommend-playlist,
  .recommend-ownersend,
  .recommend-latestmusic,
  .recommend-mv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .recommend-ownersend {
    margin-bottom: 30px;
  }
}
</style>

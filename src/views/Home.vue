<template>
  <div class="home">
    <header class="header">
      <Header/>
    </header>
    <aside>
      <SideBar/>
    </aside>
    <main class="main" :class="{cover : isCover}" :style="{bottom: playerIsShow ? '0' : '70px'}">
      <Tabs v-if="!isCover" :tabList="tabList" :defaultActive="tabDefault" @on-change="handleTabChange"/>
      <div class="main-page" id="mainPage" ref="mainRef">
        <router-view @pagin-change="handlePaginChange"/>
      </div>
    </main>
    <router-view name="video"/>
    <player/>
  </div>
</template>

<script lang="ts">
import Header from '@/layout/header/Header.vue'
import SideBar from '@/layout/SideBar.vue'
import Tabs from '@/components/header-tabs/Index.vue'
import Player from '@/layout/player/Index.vue'
import { TabItem } from '@/components/header-tabs/type'
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { playerStore } from '@/store/modules/player'
import { scrollTop } from '@/utils/animation'
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideBar,
    Tabs,
    Player
  },
  setup () {
    const $router = useRouter()
    const $route = useRoute()
    const mainRef = ref<HTMLDivElement | null>(null)
    const tabList = ref<TabItem[]>([
      {
        content: '个性推荐',
        path: '/recommend'
      },
      {
        content: '歌单',
        path: '/playList'
      },
      {
        content: '排行榜',
        path: '/rank'
      },
      {
        content: '歌手',
        path: '/singer'
      },
      {
        content: '最新音乐',
        path: '/newMusic'
      }
    ])
    const tabDefault = computed<string>(() => `/${$route.name as string}`)
    const playerIsShow = computed<boolean>(() => playerStore.currentIndex === -1)
    const handleTabChange = (path: string) => {
      $router.push(path)
    }
    // 页面跳转的，得回到顶部
    const handlePaginChange = () => {
      scrollTop(mainRef)
    }
    const isCover = computed(() => {
      return $route.meta.isCover
    })
    return {
      mainRef,
      tabList,
      tabDefault,
      isCover,
      playerIsShow,
      handleTabChange,
      handlePaginChange
    }
  }
})
</script>

<style lang="scss" scoped>
  .main {
    position: fixed;
    top: $header-height;
    right: 0;
    bottom: $player-height;
    left: $sidebar-width;
    z-index: -1;
    padding-left: 30px;
    box-sizing: border-box;

    .main-page {
      height: 100%;
      padding-top: 60px;
      padding-right: 20px;
      overflow-y: scroll;
      box-sizing: border-box;
    }

    &.cover {
      padding-left: 0;

      .main-page {
        padding-top: 0;
        padding-right: 0;
      }
    }
  }
</style>

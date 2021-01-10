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
      <div class="main-page" id="mainPage">
        <router-view/>
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
    const isCover = computed(() => {
      return $route.meta.isCover
    })
    return {
      tabList,
      tabDefault,
      isCover,
      playerIsShow,
      handleTabChange
    }
  }
})
</script>

<style lang="scss" scoped>
  .main {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 70px;
    left: 200px;
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

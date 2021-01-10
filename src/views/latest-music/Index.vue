<template>
  <div class="latest" v-loading="isLoading">
    <header class="latest-header">
      <span class="header-item active">新歌速递</span>
      <span class="header-item">新碟上架</span>
    </header>
    <main class="latest-main">
      <div class="main-top">
        <ul class="top-left">
          <li
            v-for="item in latestMusicCategorys"
            class="left-item"
            :class="{ active: item.value === categroy }"
            :key="item.value"
            @click="handleChangeCategory(item.value)"
          >
            {{ item.label }}
          </li>
        </ul>
        <div class="top-right">
          <div class="right-item highlight">
            <i class="iconfont icon-play-double"></i>
            <span>播放全部</span>
          </div>
          <div class="right-item">
            <i class="iconfont icon-player-collect"></i>
            <span>收藏全部</span>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <new-courier :topSongs="topSongs"/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import NewCourier from './components/NewCourier.vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { LASTEST_CATEGORYS } from '@/utils/constant'
import { getTopSongs } from '@/api/latest/index'
export default defineComponent({
  components: {
    NewCourier
  },
  setup () {
    const isLoading = ref<boolean>(false)
    const latestMusicCategorys = ref(LASTEST_CATEGORYS)
    const categroy = ref<number>(0)
    const data = reactive({
      topSongs: []
    })
    const handleChangeCategory = (type: number) => {
      categroy.value = type
      getNewCourierSongs()
    }
    const getNewCourierSongs = async () => {
      isLoading.value = true
      data.topSongs = await getTopSongs(categroy.value)
      isLoading.value = false
    }
    getNewCourierSongs()
    return {
      isLoading,
      categroy,
      latestMusicCategorys,
      ...toRefs(data),
      handleChangeCategory
    }
  }
})
</script>

<style lang="scss" scoped>
.latest {
  .latest-header {
    display: flex;
    justify-content: center;
    width: 232px;
    margin: auto;
    border: 1px solid #bbb;
    border-radius: 20px;

    .header-item {
      padding: 8px 32px;
      font-size: 13px;
      font-weight: 100;
      cursor: pointer;
      border-radius: 20px;

      &.active {
        font-weight: 400;
        color: #fff;
        background: #bbb;
      }
    }
  }

  .latest-main {
    margin: 20px 0;

    .main-top {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin: 10px 0;

      .top-left {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;

        .left-item {
          margin-right: 20px;
          cursor: pointer;

          &:hover {
            color: #333;
          }

          &.active {
            font-weight: bold;
            color: #333;
          }
        }
      }

      .top-right {
        display: flex;
        align-items: center;

        .right-item {
          display: flex;
          align-items: center;
          padding: 3px 10px;
          margin-left: 10px;
          font-size: 13px;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 20px;

          .iconfont {
            margin-right: 4px;
            font-size: 18px;
            color: #333;
          }

          &.highlight {
            color: #fff;
            background: #ed4141;
            border: none;

            .iconfont {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>

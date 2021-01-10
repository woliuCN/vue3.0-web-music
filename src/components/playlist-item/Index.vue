<template>
  <div class="playlist-item" @click="handleShowDetail">
    <div class="item-top">
      <img
        :src="playListItem.picUrl"
      />
      <div class="top-count">
        <i class="iconfont icon-playlist-play"></i>
        <span>{{playListItem.playCount}}</span>
      </div>
      <div class="top-author" v-if="playListItem.nickName">
        <i class="iconfont icon-user"></i>
        <span>{{playListItem.nickName}}</span>
      </div>
    </div>
    <p class="item-bottom">{{playListItem.name}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    playListItem: {
      type: Object as PropType<PlayListItem>,
      default: {}
    }
  },
  setup (props) {
    const $router = useRouter()
    const handleShowDetail = () => {
      $router.push(`/playList/${props.playListItem.id}`)
    }
    return {
      handleShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.playlist-item {
  flex: 0 0 18.5%;
  margin-bottom: 20px;
  cursor: pointer;

  .item-top {
    position: relative;
    width: 100%;

    > img {
      width: 100%;
      border-radius: 4px;
    }

    .top-count {
      position: absolute;
      top: 4px;
      right: 8px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;
    }

    .top-author {
      position: absolute;
      bottom: 8px;
      left: 8px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;
    }

    .iconfont {
      margin: 0 2px;
    }
  }

  .item-bottom {
    height: 42px;
    font-size: 14px;
    line-height: 1.5;
    @include multipleNoWrap(2);
  }
}
</style>

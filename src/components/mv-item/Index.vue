<template>
  <div class="mv-item" @click="handleShowDetail">
    <div class="item-top">
      <img
        :src="mvItem.picUrl"
      />
      <div class="top-count">
        <i class="iconfont icon-playlist-play"></i>
        <span>{{mvItem.playCount}}</span>
      </div>
      <div class="top-duration">
        {{mvItem.durationStr}}
      </div>
    </div>
    <div class="item-bottom">
      <p class="item-bottom-name">{{mvItem.name}}</p>
      <div class="item-bottom-author">{{mvItem.artistName}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { playerStore } from '@/store/modules/player'
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    mvItem: {
      type: Object as PropType<Mv>,
      default: {}
    }
  },
  setup (props) {
    const $router = useRouter()
    const handleShowDetail = () => {
      playerStore.CHANGE_PLAYING(false)
      $router.push(`/video/${props.mvItem.id}`)
    }
    return {
      handleShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.mv-item {
  width: 100%;
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
      right: 10px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;
    }

    .top-duration {
      position: absolute;
      right: 8px;
      bottom: 6px;
      font-size: 12px;
      color: #fff;
    }
  }

  .item-bottom {
    font-size: 14px;
    line-height: 1.5;

    .item-bottom-name {
      @include multipleNoWrap(1);
    }

    .item-bottom-author {
      font-size: 12px;
      font-weight: 200;
      color: #666;
    }
  }
}
</style>

<template>
  <div class="global" @click="handleShowDetail">
    <div class="global-top">
      <img
        :src="globalRank.coverImgUrl"
      />
      <div class="top-count">
        <i class="iconfont icon-playlist-play"></i>
        <span>{{globalRank.playCount}}</span>
      </div>
      <div class="top-decorate">
        <i className="iconfont icon-play"></i>
      </div>
    </div>
    <p class="global-bottom">{{globalRank.name}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    globalRank: {
      type: Object as PropType<CommonRank>,
      default: {}
    }
  },
  setup (props) {
    const $router = useRouter()
    const handleShowDetail = () => {
      $router.push(`/playList/${props.globalRank.id}`)
    }
    return {
      handleShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.global {
  flex: 0 0 18.4%;
  margin-right: 2%;
  margin-bottom: 20px;
  cursor: pointer;

  &:nth-of-type(5n + 0) {
    margin-right: 0;
  }

  .global-top {
    position: relative;

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

    .top-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      display: none;
      width: 36px;
      height: 36px;
      line-height: 36px;
      color: #ec4141;
      text-align: center;
      background: rgba(253, 253, 253, 0.9);
      border-radius: 50%;
      transform: translate(-50%, -50%);

      .icon-play {
        position: relative;
        top: 1px;
        left: 3px;
        font-size: 18px;
      }
    }

    &:hover {
      .top-decorate {
        display: block;
      }
    }
  }

  .global-bottom {
    font-size: 14px;
    line-height: 2;
  }
}
</style>

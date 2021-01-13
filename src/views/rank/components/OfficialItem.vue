<template>
  <div class="official">
    <div class="official-cover">
      <div
        class="cover-filter"
        :style="{
          background: `url(${officalRank.backgroundImgUrl})`,
          backgroundSize: 'cover',
        }"
      ></div>
      <div class="cover-decorate">
        <i className="iconfont icon-play"></i>
      </div>
      <div class="cover-time">{{ officalRank.updateTime }}更新</div>
      <img :src="officalRank.coverImgUrl" />
    </div>
    <div class="official-list">
      <div
        class="list-item"
        v-for="(item, index) in officalRank.songs"
        :key="item.id"
        @dblclick="handlePlaySong(index)"
      >
        <div class="item-left">
          <span class="left-index" :class="index <= 2 ? 'top' : ''">
            {{index + 1}}
          </span>
          -
          <span class="left-name">{{ item.name }}</span>
        </div>
        <span class="item-right">
          <template v-for="(artist, index) in item.artists" :key="artist.id">
            <span>{{
              `${artist.name}${index + 1 === item.artists.length ? "" : " / "}`
            }}</span>
          </template>
        </span>
      </div>
      <div class="more" @click="handleShowDetail">查看全部 <i class="iconfont icon-right"></i></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { playerStore } from '@/store/modules/player'
export default defineComponent({
  props: {
    officalRank: {
      type: Object as PropType<CommonRank>,
      default: {}
    }
  },
  setup (props) {
    const $router = useRouter()
    const handleShowDetail = () => {
      $router.push(`/playList/${props.officalRank.id}`)
    }
    const handlePlaySong = (index: number) => {
      playerStore.CHANGE_CURRENTINDEX(index)
      playerStore.CHANGE_CURRENTSONGS_STACK(props.officalRank.songs)
    }
    return {
      handleShowDetail,
      handlePlaySong
    }
  }
})
</script>

<style lang="scss" scoped>
.official {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  .official-cover {
    position: relative;
    width: 172px;
    height: 172px;
    overflow: hidden;
    cursor: pointer;

    .cover-filter {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      filter: blur(2px);
    }

    .cover-time {
      position: absolute;
      bottom: 25%;
      z-index: 2;
      width: 100%;
      font-size: 12px;
      color: #f1f2f3;
      text-align: center;
    }

    .cover-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      display: none;
      width: 36px;
      height: 36px;
      line-height: 36px;
      color: $primary-color;
      text-align: center;
      background: rgba(253, 253, 253, 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);

      .icon-play {
        position: relative;
        top: 1px;
        left: 3px;
        font-size: 18px;
      }
    }

    > img {
      position: absolute;
      top: 0;
      width: 100%;
      border-radius: 4px;
      opacity: 0.9;
    }

    &:hover {
      .cover-decorate {
        display: block;
      }
    }
  }

  .official-list {
    flex: 1;
    margin-left: 40px;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 34px;
      padding: 0 10px;
      font-size: 12px;
      color: #444;
      border-radius: 4px;

      &:nth-child(odd) {
        background: #f8f8f8;
      }

      &:hover {
        background: #f1f2f3;
      }

      .left-index {
        margin-right: 4px;
        font-size: 14px;
        color: #999;

        &.top {
          color: #ed4141;
        }
      }

      .left-name {
        margin-left: 4px;
      }

      .item-right {
        color: #999;
      }
    }

    .more {
      height: 34px;
      padding: 0 10px;
      font-size: 12px;
      font-weight: 100;
      line-height: 34px;
      cursor: pointer;

      .iconfont {
        font-size: 12px;
      }
    }
  }
}
</style>

<template>
  <div class="latest-music-item" @click="$emit('play')">
    <div class="item-left">
      <img :src="latestMusicItem.picUrl" />
      <div class="img-decorate">
        <i className="iconfont icon-play"></i>
      </div>
    </div>
    <div class="item-right">
      <div
        class="music-name"
        :title="`${latestMusicItem.name}(${latestMusicItem.alias})`"
      >
        {{ latestMusicItem.name}}
        <span v-if="latestMusicItem.alias" class="music-alias">({{latestMusicItem.alias}})</span>
      </div>
      <div class="music-info">
        <span v-if="latestMusicItem.mvId !== 0" class="music-info-extra">MV</span>
        <span v-if="latestMusicItem.sq" class="music-info-extra">SQ</span>
        <span class="music-info-singers">
          <template v-for="(artist, index) in latestMusicItem.artists" :key="artist.id">
            <span>{{`${artist.name}${ index + 1 === latestMusicItem.artists.length ? '' : ' / '}`}}</span>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    latestMusicItem: {
      type: Object as PropType<Song>,
      default: {}
    }
  },
  emits: ['play']
})
</script>

<style lang="scss" scoped>
.latest-music-item {
  flex: 0 0 32%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .item-left {
    position: relative;
    cursor: pointer;

    > img {
      width: 48px;
      border-radius: 4px;
    }

    .img-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: #ec4141;
      text-align: center;
      background: rgba(253, 253, 253, 0.9);
      border-radius: 50%;
      transform: translate(-50%, -50%);

      .icon-play {
        position: relative;
        top: -2px;
        left: 2px;
        font-size: 12px;
      }
    }
  }

  .item-right {
    flex: 1;
    display: flex;
    height: 48px;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    font-size: 13px;

    .music-info,
    .music-name {
      cursor: default;
      @include multipleNoWrap(1);

      .music-alias {
        color: #999;
      }
    }

    .music-info {
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #999;

      .music-info-extra {
        padding: 0 1px;
        margin-right: 5px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
        color: #ec4141;
        border: 1px solid #ec4141;
        border-radius: 2px;
        box-sizing: border-box;
      }

      .music-info-singers {
        font-weight: 100;
      }
    }

    &:hover {
      background: #f1f2f3;
    }
  }
}
</style>

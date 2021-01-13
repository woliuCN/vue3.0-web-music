<template>
  <div class="music" v-for="(song, index) in topSongs" :key="song.id" @dblclick="handlePlaySong(index)">
    <span class="music-index">{{index > 8 ? index + 1 : (index + 1 + '').padStart(2,0)}}</span>
    <div class="music-img">
      <img
        :src="song.picUrl"
      />
      <div class="img-decorate">
        <i className="iconfont icon-play"></i>
      </div>
    </div>
    <div class="music-name">
      <div>{{song.name}}<span v-if="song.alias" style="color: #999;"> &nbsp;({{song.alias}})</span></div>
      <i class="iconfont icon-sq" v-if="song.sq"></i>
      <i class="iconfont icon-mv" v-if="song.mvId" @click="handleShowVideo(song.mvId)"></i>
    </div>
    <span class="music-singer">
      <template v-for="(artist, index) in song.artists" :key="artist.id">
        <span>{{`${artist.name}${ index + 1 === song.artists.length ? '' : ' / '}`}}</span>
      </template>
    </span>
    <span class="music-album">{{song.album.name}}</span>
    <span class="music-duration">{{song.durationStr}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { playerStore } from '@/store/modules/player'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    topSongs: {
      type: Array as PropType<Song[]>,
      default: []
    }
  },
  setup (props) {
    const $router = useRouter()
    const handlePlaySong = (index: number) => {
      playerStore.CHANGE_CURRENTINDEX(index)
      playerStore.CHANGE_CURRENTSONGS_STACK(props.topSongs)
    }
    const handleShowVideo = (id: string) => {
      playerStore.CHANGE_PLAYING(false)
      $router.push(`/video/${id}`)
    }
    return {
      handlePlaySong,
      handleShowVideo
    }
  }
})
</script>

<style lang="scss" scoped>
.music {
  display: flex;
  align-items: center;
  height: 84px;
  padding: 0 10px;
  font-size: 14px;
  color: #666;

  .music-index {
    flex: 0 0 25px;
    margin-right: 15px;
    color: #999;
  }

  .music-img {
    flex: 0 0 64px;
    position: relative;
    margin-right: 10px;
    cursor: pointer;

    > img {
      width: 100%;
    }

    .img-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: $primary-color;
      text-align: center;
      background: rgba(253, 253, 253, 0.9);
      border-radius: 50%;
      transform: translate(-50%, -50%);

      .icon-play {
        position: relative;
        top: -1px;
        left: 2px;
        font-size: 12px;
      }
    }
  }

  .music-name {
    flex: 1;
    display: flex;
    align-items: center;

    >div {
      @include noWrap(300px);
    }

    .iconfont {
      position: relative;
      top: 1px;
      font-size: 36px;
      color: $primary-color;

    }
  }

  .music-singer, .music-album {
      width: 220px;
      height: 20px;
      margin-right: 10px;
      line-height: 20px;
      flex: 0 0 auto;
      @include noWrap(220px);
  }

  .music-duration {
      flex: 0 0 50px;
      text-align: right;
  }

  &:nth-child(odd) {
    background: #f8f8f8;
  }
}
</style>

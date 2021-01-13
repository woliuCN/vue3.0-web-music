<template>
  <div class="list-item list-header" v-if="showTitle">
    <span class="item-index"></span>
    <div class="item-options"></div>
    <div class="item-title">音乐标题</div>
    <span class="item-singer">歌手</span>
    <span class="item-album">专辑</span>
    <span class="item-duration">时长</span>
  </div>
  <ul>
    <li
      class="list-item"
      v-for="(song, index) in songs"
      :key="song.id"
      @dblclick="handlePlaySong(index)"
    >
      <i
        v-if="
          currentSongInfo.currentSong &&
          currentSongInfo.currentSong.id === song.id &&
          currentSongInfo.currentIndex === index
        "
        class="item-index iconfont icon-song-volume"
      >
      </i>
      <span v-else class="item-index">{{
        (index + 1).toString().padStart(2, "0")
      }}</span>
      <div class="item-options">
        <i class="iconfont icon-song-like"></i>
        <i class="iconfont icon-song-download"></i>
      </div>
      <div class="item-title">
        <div class="title-name">
          <span>{{ song.name }}</span>
          <span v-if="song.alias" class="title-alias">({{ song.alias }})</span>
        </div>
        <i v-if="song.sq" class="iconfont icon-sq"></i>
        <i v-if="song.mvId" class="iconfont icon-mv" @click="handleShowMvDetail(song.mvId)"></i>
      </div>
      <span class="item-singer" v-if="showTitle">
        <template v-for="(artist, index) in song.artists" :key="artist.id">
          <span>{{
            `${artist.name}${index + 1 === song.artists.length ? "" : " / "}`
          }}</span>
        </template>
      </span>
      <span class="item-album" v-if="showTitle">{{ song.album.name }}</span>
      <span class="item-duration">{{ song.durationStr }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { playerStore } from '@/store/modules/player'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    showTitle: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    songs: {
      type: Array as PropType<Song[]>,
      default: []
    }
  },
  setup (props) {
    const $router = useRouter()
    const currentSongInfo = computed(() => {
      return {
        currentSong: playerStore.currentSong,
        currentIndex: playerStore.currentIndex
      }
    })
    const handlePlaySong = (index: number) => {
      playerStore.CHANGE_CURRENTINDEX(index)
      playerStore.CHANGE_CURRENTSONGS_STACK(props.songs)
    }
    const handleShowMvDetail = (id: number) => {
      playerStore.CHANGE_PLAYING(false)
      $router.push(`/video/${id}`)
    }
    return {
      currentSongInfo,
      handlePlaySong,
      handleShowMvDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 13px;
  color: #888;

  .item-index {
    flex: 0 0 4%;
    text-align: right;

    &.icon-song-volume {
      font-size: 18px;
      color: $primary-color;
    }
  }

  .item-options {
    flex: 0 0 5%;
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 0 1%;

    .iconfont {
      font-size: 24px;
      color: #888;
    }
  }

  .item-title {
    flex: 1;
    display: flex;
    align-items: center;
    color: #333;

    .title-name {
      @include noWrap(280px);

      > span {
        margin-right: 5px;
      }

      .title-alias {
        color: #999;
      }
    }

    .iconfont {
      font-size: 36px;
      color: $primary-color;
      vertical-align: middle;
    }
  }

  .item-singer {
    flex: 0 0 20%;
    padding: 0 10px;
    color: #666;
    box-sizing: border-box;
    @include noWrap(20%);
  }

  .item-album {
    flex: 0 0 25%;
    padding: 0 10px;
    color: #666;
    box-sizing: border-box;
    @include noWrap(25%);
  }

  .item-duration {
    flex: 0 0 10%;
  }

  &:nth-child(odd) {
    background: #f9f9f9;
  }

  &:hover {
    background: #f0f0f0;
  }

  &.list-header {
    background: #fff;

    .item-title,
    .item-singer .item-album {
      color: #888;
    }
  }
}
</style>

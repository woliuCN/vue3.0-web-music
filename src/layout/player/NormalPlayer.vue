<template>
  <transition
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
    :css="false"
  >
    <div class="normal-player" ref="playerRef" v-if="isFull">
      <div class="player-top">
        <div class="cd-container">
          <img
            src="@/assets/images/stylus.png"
            class="cd-stylus"
            :style="{ transform: `rotateZ(${isPlaying ? 20 : -10}deg)` }"
          />
          <div class="cd-disc" :class="isPlaying ? 'infinite' : ''">
            <img :src="currentSong.picUrl" class="song-img" />
          </div>
          <div class="cd-options">
            <i class="iconfont icon-player-like"></i>
            <i class="iconfont icon-player-collect"></i>
            <i class="iconfont icon-player-download"></i>
            <i class="iconfont icon-share"></i>
          </div>
        </div>
        <div class="song-info">
          <h1 class="song-title">
            <span class="song-name">{{ currentSong.name }}</span>
            <span v-if="currentSong.mvId" class="song-extra" @click="handleShowDetail(`/video/${currentSong.mvId}`, true)">MV</span>
            <span class="song-extra">极高音质</span>
          </h1>
          <div class="singer-belong">
            <div class="belong-item">
              <span class="item-label">专辑:</span>
              <span class="item-value" @click="handleShowDetail(`/album/${currentSong.album.id}`)">{{ currentSong.album.name }}</span>
            </div>
            <div class="belong-item">
              <span class="item-label">歌手:</span>
              <span class="item-value">
                <template
                  v-for="(artist, index) in currentSong.artists"
                  :key="artist.id"
                >
                  <span @click="handleShowDetail(`/singer/${artist.id}`)">{{
                    `${artist.name}${
                      index + 1 === currentSong.artists.length ? "" : " / "
                    }`
                  }}</span>
                </template>
              </span>
            </div>
            <div class="belong-item">
              <span class="item-label">来源:</span>
              <span class="item-value">好听的音乐</span>
            </div>
          </div>
          <inline-lyric />
        </div>
      </div>
      <div class="player-bootom">
        <div class="comment-container">
          <h1 class="container-title">
            评论<span> (已有{{ songCommentInfo.total }}条评论)</span>
          </h1>
          <div class="container-box">
            <div class="box-item">
              <i class="iconfont icon-pen"></i>
              <span>发表评论</span>
            </div>
            <div class="box-item">
              <i class="iconfont icon-emotional"></i>
              <i class="iconfont icon-at"></i>
            </div>
          </div>
          <comments
            :hotComments="songCommentInfo.hotComments"
            :comments="songCommentInfo.comments"
            :total="songCommentInfo.total"
          />
          <pagin
            :pageCount="songCommentInfo.pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @change="handlePaginChange"
          />
        </div>
        <div class="simlar-container">
          <h1 class="title">相似歌曲</h1>
          <div class="music-item" v-for="(song, index) in simiSongs" :key="song.id">
            <div class="item-left" @click="handlePlaySong(index)">
              <img
                :src="song.picUrl"
              />
              <div class="img-decorate">
                <i className="iconfont icon-play"></i>
              </div>
            </div>
            <div class="item-right">
              <div class="music-name">
                {{song.name}}
                <span v-if="song.alias" class="music-alias">({{song.alias}})</span>
              </div>
              <div class="music-artist">
                <template v-for="(artist, index) in song.artists" :key="artist.id">
                  <span>{{`${artist.name}${ index + 1 === song.artists.length ? '' : ' / '}`}}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shrink-wrapper" @click="$emit('change-player-status')">
        <i class="iconfont icon-shrink"></i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import InlineLyric from '@/components/inline-lyric/Index'
import usePlayerAnimation from '@/hooks/player/userPlayerAnimation'
import { defineComponent, PropType, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { playerStore } from '@/store/modules/player'
import { scrollTop } from '@/utils/animation'
export default defineComponent({
  props: {
    isFull: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  components: {
    InlineLyric
  },
  emits: ['change-player-status'],
  setup (props, context) {
    const $router = useRouter()
    const currentPage = ref<number>(1)
    const playerRef = ref<HTMLDivElement | null>(null)
    const currentSong = computed<Song>(() => playerStore.currentSong)
    const simiSongs = computed<Song[]>(() => playerStore.simiSongs)
    const isPlaying = computed<boolean>(() => playerStore.playing)
    const songCommentInfo = computed(() => playerStore.currentSongCommentInfo)
    const handlePaginChange = (cur: number) => {
      scrollTop(playerRef, 450)
      currentPage.value = cur
      playerStore.getSongCommentInfo(cur)
    }
    const handlePlaySong = (index: number) => {
      playerStore.CHANGE_CURRENTINDEX(index)
      playerStore.CHANGE_CURRENTSONGS_STACK(simiSongs.value)
    }
    const handleShowDetail = (url: string, stop: boolean) => {
      if (stop) {
        playerStore.CHANGE_PLAYING(false)
      }
      context.emit('change-player-status')
      $router.push(url)
    }
    const { handleEnter, handleAfterEnter, handleLeave, handleAfterLeave } = usePlayerAnimation()
    return {
      playerRef,
      isPlaying,
      currentPage,
      currentSong,
      simiSongs,
      songCommentInfo,
      handlePlaySong,
      handlePaginChange,
      handleShowDetail,
      handleEnter,
      handleAfterEnter,
      handleLeave,
      handleAfterLeave
    }
  }
})
</script>
<style lang="scss" scoped>
.normal-player {
  position: fixed;
  top: 60px;
  bottom: 70px;
  width: 100%;
  padding: 0 14vw;
  overflow-y: auto;
  background: #fefefe;
  box-sizing: border-box;

  .player-top {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .cd-container {
      position: relative;
      width: 50%;

      .cd-stylus {
        position: absolute;
        top: -10px;
        left: 48%;
        z-index: 1;
        width: 160px;
        transform-origin: 10px 10px;
        transition: all 0.3s ease-in-out;
      }

      .cd-disc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 360px;
        margin: 30px auto 10px auto;
        background: url("../../assets/images/cover.png") no-repeat center;
        background-size: cover;

        &.infinite {
          animation: roate 16s linear infinite;
        }

        .song-img {
          width: 60%;
          height: 60%;
          border-radius: 50%;
        }
      }

      .cd-options {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 340px;
        margin: auto;

        .iconfont {
          padding: 8px;
          font-size: 26px;
          color: #333;
          background: #f5f5f5;
          border-radius: 50%;
        }
      }
    }

    .song-info {
      width: 50%;
      padding: 0 40px;
      margin-top: 30px;
      box-sizing: border-box;

      .song-title {
        display: flex;
        align-items: flex-end;
        font-size: 24px;

        .song-name {
          @include noWrap(70%);
        }

        .song-extra {
          padding: 1px 2px;
          margin-left: 8px;
          font-size: 12px;
          color: #ec4141;
          cursor: default;
          border: 1px solid #ec4141;
          border-radius: 2px;
        }
      }

      .singer-belong {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        font-size: 13px;

        .belong-item {
          flex: 0 0 auto;
          @include noWrap(33%);

          .item-label {
            color: #888;
          }

          .item-value {
            margin-left: 6px;
            color: #5480b1;
            cursor: pointer;
          }
        }
      }
    }
  }

  .player-bootom {
    display: flex;
    align-items: flex-start;
    margin: 40px 0;

    .comment-container {
      flex: 0 0 65%;
      padding: 20px;
      box-sizing: border-box;

      .container-title {
        font-size: 15px;
        font-weight: bold;

        > span {
          font-size: 12px;
          font-weight: 100;
          color: #999;
        }
      }

      .container-box {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        height: 60px;
        padding: 5px;
        margin: 20px 0;
        margin-bottom: 40px;
        font-size: 13px;
        font-weight: 100;
        color: #999;
        cursor: text;
        border: 1px solid #e2e2e2;
        border-radius: 4px;

        .box-item {
          display: flex;
          align-items: center;

          .iconfont {
            margin: 0 5px;
            font-size: 24px;
          }
        }
      }
    }

    .simlar-container {
      flex: 1;
      padding: 20px;
      margin-left: 10px;

      .title {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
      }

      .music-item {
        display: flex;
        align-items: center;
        padding: 5px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-sizing: border-box;

        .item-left {
          position: relative;
          cursor: pointer;

          > img {
            width: 52px;
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
          margin-left: 10px;
          font-size: 12px;
          cursor: default;

          .music-name {
            margin-bottom: 10px;
            @include multipleNoWrap(1);

            .music-alias {
              color: #999;
            }
          }

          .music-artist {
            font-size: 13px;
            color: #666;
          }
        }

        &:hover {
          background: #f1f2f3;
        }
      }
    }
  }

  .shrink-wrapper {
    position: absolute;
    top: 20px;
    right: 12vw;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #efefef;
    border-radius: 5px;

    .icon-shrink {
      font-size: 20px;
    }
  }
}

@keyframes roate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

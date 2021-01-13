<template>
  <div class="mini-player">
    <div class="player-left">
      <div class="music-img" @click="handleChangePlayerStatus">
        <i class="iconfont icon-blow"></i>
        <img :src="currentSong.picUrl" />
      </div>
      <div class="music-info">
        <div class="music-name">{{ currentSong.name }}</div>
        <div class="music-singer">
          <template
            v-for="(artist, index) in currentSong.artists"
            :key="artist.id"
          >
            <span>{{
              `${artist.name}${
                index + 1 === currentSong.artists.length ? "" : " / "
              }`
            }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="player-middle">
      <div class="player-buttons">
        <div class="button-mode">
          <div class="mode-toast" v-show="showToast">{{modeText}}</div>
          <i class="iconfont play-mode" :class="modeIconClass" @click="handleChangeMode" :title="modeText"></i>
        </div>
        <i class="iconfont icon-pre" @click="$emit('change-song', 0)"></i>
        <div class="play-wrapper" @click="handleTogglePlay">
          <i class="iconfont" :class="isPlay ? 'icon-pause' : 'icon-play'"></i>
        </div>
        <i class="iconfont icon-next" @click="$emit('change-song', 1)"></i>
        <span class="icon-word" @click="showLyric = !showLyric">词</span>
      </div>
      <div class="middle-progress">
        <div class="progress-time">{{ startTimeStr }}</div>
        <Progress
        scale
        :percent="percent"
        :percentChange="handleSongPercentChange"
        />
        <div class="progress-time">{{ endTimeStr }}</div>
      </div>
    </div>
    <div class="player-right">
      <i v-if="!volume" class="iconfont icon-mute" @click="handleToggleMute"></i>
      <i v-else class="iconfont icon-volume" @click="handleToggleMute"></i>
       <Progress
        class="right-progress"
        :percent="volume"
        :percentChange="handleVolumePercentChange"
      />
    </div>
  </div>
  <outline-lyric v-if="showLyric" @close="showLyric = false"/>
</template>

<script lang="ts">
import Progress from '@/components/progress/Index.vue'
import OutlineLyric from '@/components/outline-lyric/Index.vue'
import { defineComponent, PropType, computed, ref } from 'vue'
import { playerStore } from '@/store/modules/player'
import { MODE } from '@/utils/constant'
import { formatDuration, debounce } from '@/utils/util'
export default defineComponent({
  components: {
    Progress,
    OutlineLyric
  },
  props: {
    startTime: {
      type: Number as PropType<number>,
      default: 0
    },
    endTime: {
      type: Number as PropType<number>,
      default: 0
    },
    percent: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  emits: ['change-song', 'change-player-status', 'change-percent'],
  setup (props, ctx) {
    const preVolume = ref<number>(0)
    const showLyric = ref<boolean>(true)
    const showToast = ref<boolean>(false)
    const volume = computed<number>(() => playerStore.volume)
    const isPlay = computed<boolean>(() => playerStore.playing)
    const currentSong = computed<Song>(() => playerStore.currentSong)
    const startTimeStr = computed<string>(() => {
      return formatDuration(props.startTime)
    })
    const endTimeStr = computed<string>(() => {
      return formatDuration(props.endTime)
    })
    const modeIconClass = computed<string>(() => {
      const { mode } = playerStore
      switch (mode) {
        case MODE.singleCycle:
          return 'icon-circle-one'
        case MODE.orderPlay:
          return 'icon-order'
        case MODE.listLoop:
          return 'icon-circle'
        case MODE.randomPlay:
          return 'icon-random'
        default:
          return 'icon-circle-one'
      }
    })
    const modeText = computed<string>(() => {
      const { mode } = playerStore
      const map = {
        0: '单曲循环',
        1: '顺序播放',
        2: '列表循环',
        3: '随机播放'
      }
      return map[mode]
    })
    const handleTogglePlay = () => {
      playerStore.CHANGE_PLAYING(!isPlay.value)
    }
    // 切换播放器状态,全屏或者底部栏
    const handleChangePlayerStatus = () => {
      ctx.emit('change-player-status')
    }
    // 播放模式切换
    const handleChangeMode = debounce(() => {
      playerStore.CHANGE_MODE()
      showToast.value = true
      const timer = setTimeout(() => {
        showToast.value = false
        clearTimeout(timer)
      }, 2000)
    }, 500)

    // 更改音量
    const handleToggleMute = () => {
      if (playerStore.volume) {
        preVolume.value = playerStore.volume
        playerStore.CHANGE_VOLUME(0)
      } else {
        playerStore.CHANGE_VOLUME(preVolume.value)
      }
    }
    const handleSongPercentChange = (percent: number) => {
      ctx.emit('change-percent', percent)
    }
    const handleVolumePercentChange = (percent: number) => {
      playerStore.CHANGE_VOLUME(percent)
    }
    return {
      isPlay,
      showLyric,
      showToast,
      volume,
      currentSong,
      modeIconClass,
      modeText,
      startTimeStr,
      endTimeStr,
      handleTogglePlay,
      handleToggleMute,
      handleChangePlayerStatus,
      handleSongPercentChange,
      handleVolumePercentChange,
      handleChangeMode
    }
  }
})
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 10px 20px;
  background: #f6f6f8;
  border-top: 1px solid #efefef;
  box-sizing: border-box;

  .player-left {
    flex: 0 0 25%;
    display: flex;
    align-items: center;

    .music-img {
      position: relative;
      flex: 0 0 48px;
      height: 48px;
      cursor: pointer;

      .icon-blow {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        font-size: 36px;
        line-height: 48px;
        color: #fff;
        text-align: center;
        background: rgba(7, 17, 27, 0.5);
        border-radius: 4px;
        transform: scale(0);
        transition: all 0.2s ease-in-out;
      }

      > img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }

      &:hover {
        .icon-blow {
          transform: scale(1);
        }

        > img {
          filter: blur(2px);
        }
      }
    }

    .music-info {
      margin-left: 12px;
      font-size: 12px;
      color: #333;

      .music-name {
        margin-bottom: 10px;
        font-size: 15px;
      }

      .music-name,
      .music-singer {
        @include noWrap(120px);
      }
    }
  }

  .player-middle {
    flex: 1;

    .player-buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      .play-wrapper {
        position: relative;
        width: 36px;
        height: 36px;
        margin: 0 30px;
        text-align: center;
        cursor: pointer;
        background: #ebebed;
        border-radius: 50%;

        .icon-play {
          position: absolute;
          top: 10px;
          left: 12px;
          font-size: 18px;
        }

        .icon-pause {
          position: absolute;
          top: 9px;
          left: 8px;
          font-size: 20px;
        }

        .iconfont {
          &:hover {
            color: #ff4e4e;
          }
        }
      }

      > .iconfont {
        font-size: 15px;
        color: #2f2f30;
        cursor: pointer;

        &:hover {
          color: #ff4e4e;
        }
      }

      .button-mode {
        position: relative;
        cursor: pointer;

        .mode-toast {
          position: absolute;
          top: -30px;
          left: -36px;
          width: 100px;
          height: 28px;
          font-size: 12px;
          line-height: 28px;
          color: #fff;
          text-align: center;
          background: hsla(0, 1%, 8%, 0.3);
          border-radius: 2px;
          transition: all .3s ease-in-out;
        }

        .play-mode {
          margin-right: 35px;
          font-size: 20px;
        }
      }

      .icon-word {
        margin-left: 35px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          color: #ff4e4e;
        }
      }
    }

    .middle-progress {
      display: flex;
      align-items: center;
      justify-content: center;

      .progress-time {
        font-size: 12px;
        color: #939393;
      }
    }
  }

  .player-right {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 24px;
      cursor: pointer;
    }

    .right-progress {
      width: 100px;
    }
  }
}
</style>

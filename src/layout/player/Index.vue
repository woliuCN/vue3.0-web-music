<template>
  <div class="player-container">
    <mini-player
      v-if="isShowMiniPlayer"
      :percent="percent"
      :startTime="startTime"
      :endTime="endTime"
      @change-song="handleEnd"
      @change-percent="handleChangePercent"
      @change-player-status="handleChangePlayerStatus"
    />
    <normal-player
      :isFull="isFull"
      @change-player-status="handleChangePlayerStatus"
    />
    <audio
      ref="audioRef"
      @ended="handleEnd"
      @timeupdate="handleUpdateTime"
      @error="handleErr"
    ></audio>
  </div>
</template>

<script lang="ts">
import MiniPlayer from './MiniPlayer.vue'
import NormalPlayer from './NormalPlayer.vue'
import { MODE } from '@/utils/constant'
import { playerStore } from '@/store/modules/player'
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'

export type Duration = {
  startTime: number;
  endTime: number;
  percent: number;
}

export default defineComponent({
  components: {
    MiniPlayer,
    NormalPlayer
  },
  setup () {
    const isFull = ref<boolean>(false)
    const audioRef = ref<HTMLAudioElement | null>(null)
    const duration = reactive({
      startTime: 0,
      endTime: 0,
      percent: 0
    })
    const isShowMiniPlayer = computed(() => playerStore.currentSongsStack && playerStore.currentSongsStack.length > 0)
    watch(
      [() => playerStore.currentIndex, () => playerStore.currentSongsStack],
      () => {
        const { currentIndex, currentSongsStack } = playerStore
        if (
          currentIndex === -1 ||
          !currentSongsStack.length ||
          !currentSongsStack[currentIndex]
        ) {
          return
        }
        try {
          duration.startTime = 0
          duration.endTime = currentSongsStack[currentIndex].duration
          audioRef.value.src = `https://music.163.com/song/media/outer/url?id=${currentSongsStack[currentIndex].id}.mp3`
          audioRef.value.play()
          playerStore.CHANGE_LINENO(0)
          playerStore.CHANGE_PLAYING(true)
          playerStore.CHANGE_CURRENTSONG(currentSongsStack[currentIndex])
          playerStore.getSongLyrics()
          playerStore.getSimiSongs()
          playerStore.getSongCommentInfo()
        } catch (error) {
          handleEnd()
        }
      },
      { deep: true }
    )
    watch(() => playerStore.playing, (val: boolean) => {
      val ? audioRef.value.play() : audioRef.value.pause()
    })
    const handleChangePlayerStatus = () => {
      isFull.value = !isFull.value
    }
    const handleEnd = (state = 1) => {
      const { mode } = playerStore
      switch (mode) {
        case MODE.singleCycle:
          handleLoop()
          break
        case MODE.orderPlay:
          handleOrder(state)
          break
        case MODE.listLoop:
          handleListLoop()
          break
        case MODE.randomPlay:
          handleRandom()
          break
        default:
          handleLoop()
          break
      }
    }
    const handleUpdateTime = (e: any) => {
      duration.startTime = e.target.currentTime * 1000
      duration.percent = isNaN(duration.startTime / duration.endTime)
        ? 0
        : duration.startTime / (duration.endTime)
      getCurrentLyric(e.target.currentTime)
    }
    // 手动改变进度条触发事件
    const handleChangePercent = (percent: number) => {
      const lyrics = playerStore.lyrics
      const currentTime = (percent * duration.endTime) / 1000
      audioRef.value.currentTime = currentTime
      // 重新计算歌词到第几行了
      for (let index = 0; index < lyrics.length; index++) {
        if (lyrics[index].time >= currentTime) {
          playerStore.CHANGE_LINENO(index)
          return
        }
      }
    }
    const handleErr = () => {
      handleOrder()
    }
    // 单曲循环
    const handleLoop = () => {
      playerStore.CHANGE_LINENO(0)
      audioRef.value.currentTime = 0
      audioRef.value.play()
    }
    // 列表循环
    const handleListLoop = () => {
      playerStore.CHANGE_CURRENTINDEX(1)
    }
    // 顺序播放
    const handleOrder = (status = 1) => {
      const { currentIndex, currentSongsStack } = playerStore
      let newIndex: number
      // 如果是下一首
      if (status) {
        // 如果是最后一首
        newIndex = currentIndex === (currentSongsStack.length - 1) ? 0 : currentIndex + 1
      } else {
        // 如果是上一首且是第一首
        newIndex = currentIndex === 0 ? currentSongsStack.length - 1 : currentIndex - 1
      }
      playerStore.CHANGE_CURRENTINDEX(newIndex)
    }
    // 随机播放
    const handleRandom = () => {
      const newIndex: number = Math.floor(Math.random() * playerStore.currentSongsStack.length)
      playerStore.CHANGE_CURRENTINDEX(newIndex)
    }

    const getCurrentLyric = (currentTime: number) => {
      const lyrics = playerStore.lyrics
      const lineNo = playerStore.currentLineNo
      if (!lyrics || !lyrics[lineNo]) return
      if (lyrics[lineNo].time <= currentTime) {
        playerStore.CHANGE_LYRIC(lyrics[lineNo].text)
        playerStore.CHANGE_LINENO(lineNo + 1)
      }
    }
    onMounted(() => {
      watch(() => playerStore.volume, (val: number) => {
        audioRef.value.volume = val
      }, { immediate: true })
    })
    return {
      isFull,
      audioRef,
      isShowMiniPlayer,
      handleOrder,
      handleEnd,
      handleErr,
      handleUpdateTime,
      handleChangePercent,
      handleChangePlayerStatus,
      ...toRefs(duration)
    }
  }
})
</script>

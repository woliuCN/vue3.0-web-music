<template>
  <div
    class="outline-lyric"
    ref="lyricRef"
    @mouseup="handleUp"
    @mousemove="handleMove"
    @mousedown="handleDown"
  >
    <div class="lyric-options">
      <i class="iconfont icon-lyric-prev"></i>
      <i class="iconfont icon-lyric-pause"></i>
      <i class="iconfont icon-lyric-next"></i>
      <i class="iconfont icon-lyric-setting"></i>
      <i class="iconfont icon-lyric-close" @click="$emit('close')"></i>
    </div>
    <p class="lyric-content">{{currentLyric}}</p>
  </div>
</template>
<script lang="ts">
import { playerStore } from '@/store/modules/player'
import { defineComponent, ref, reactive, computed } from 'vue'

export default defineComponent({
  name: 'outlineLyric',
  emits: ['close'],
  setup () {
    const lyricRef = ref<HTMLElement | null>(null)
    const currentLyric = computed<string>(() => playerStore.currentLyric)
    const position = reactive({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      isStart: false
    })
    const handleUp = () => {
      if (lyricRef.value) {
        position.isStart = false
        lyricRef.value.style.cursor = 'default'
      }
    }
    const handleMove = (event: MouseEvent) => {
      if (!position.isStart) {
        return
      }
      if (lyricRef.value) {
        const newX = event.clientX
        const newY = event.clientY
        // 计算最后的 left top 距离
        const newLeft = newX - (position.x - position.left)
        const newTop = newY - (position.y - position.top)
        lyricRef.value.style.left = newLeft + 'px'
        lyricRef.value.style.top = newTop + 'px'
      }
    }
    // 点击的时候记录相应的块内的点的位置以及整个块对屏幕的位置
    const handleDown = (event: MouseEvent) => {
      if (lyricRef.value) {
        position.x = event.clientX
        position.y = event.clientY
        position.left = lyricRef.value.offsetLeft
        position.top = lyricRef.value.offsetTop
        position.isStart = true
        lyricRef.value.style.cursor = 'move'
      }
    }
    return {
      lyricRef,
      currentLyric,
      position,
      handleDown,
      handleMove,
      handleUp
    }
  }
})
</script>

<style scoped lang="scss">
.outline-lyric {
  position: fixed;
  right: 50%;
  bottom: 20px;
  left: 50%;
  z-index: 99999;
  width: 48vw;
  height: 8vw;
  border-radius: 2px;
  transform: translateX(-50%);

  &:hover {
    background: hsla(0, 1%, 8%, 0.3);
    border: 1px solid hsla(0, 1%, 10%, 0.1);

    .lyric-options {
      opacity: 1;
    }

    .lyric-content {
       /* background-image: linear-gradient(#cbfafe, #d9f9fc, #cbfafe); */
      background-image: linear-gradient(#f8ffeb, #e3ffc2, #f8ffeb);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }
  }

  .lyric-options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60%;
    height: 30px;
    margin: auto;
    opacity: 0;

    .iconfont {
      font-size: 20px;
      color: #f3f3f3;
      cursor: pointer;
    }
  }

  .lyric-content {
    margin-top: 20px;
    font-family: "微软雅黑";
    font-size: 26px;
    font-weight: bold;
    color: #c8ef9c;
    text-align: center;
  }
}
</style>

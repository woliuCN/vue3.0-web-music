<template>
  <div class="progress-bar">
    <!-- <div class="bar-time">{{ startTimeStr }}</div> -->
    <!--
     灰色进度条
     红色进度条
     进度条按钮
    -->
    <div class="bar-inner" :class="{scale: scale}" ref="progressBarRef" @click="handleClick">
      <div class="bar-progress" ref="progressRef"></div>
      <div
        class="progress-btn"
        ref="progressBtnRef"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      ></div>
    </div>
    <!-- <div class="bar-time">{{ endTimeStr }}</div> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  watchEffect,
  toRefs
} from 'vue'
import { CallBack } from './type'
export default defineComponent({
  props: {
    scale: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    percent: {
      type: Number as PropType<number>,
      default: 0
    },
    percentChange: {
      type: Function as PropType<CallBack>,
      default: () => {}
    }
  },
  setup (props) {
    const BTN_WIDTH = 10
    // bar-inner ref
    const progressBarRef = ref<HTMLDivElement | null>(null)
    // bar-progress ref
    const progressRef = ref<HTMLDivElement | null>(null)
    // progress-btn ref
    const progressBtnRef = ref<HTMLDivElement | null>(null)
    // 记录用户点击的对象
    const touch = reactive({
      initial: false, // 是否开始点击
      startX: 0, // 拖动的初始位置
      left: 0 // 进度条长度
    })
    /* 拖动的时候的位移计算方法 */
    const _offset = (moveWidth: number) => {
      if (!progressRef.value || !progressBtnRef.value) {
        return
      }
      progressRef.value.style.width = `${moveWidth}px`
      progressBtnRef.value.style.transform = `translateX(${moveWidth}px)`
    }
    const handleMouseDown = (e: MouseEvent) => {
      touch.initial = true
      touch.startX = e.pageX
      touch.left = progressRef.value ? progressRef.value.clientWidth : 0
    }
    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      if (!touch.initial) return // 点击了就松手了,就直接返回
      const moveX: number = e.pageX - touch.startX // 计算移动距离
      // 计算播放条可走的长度
      if (progressBarRef.value) {
        const barWidth = progressBarRef.value.clientWidth - BTN_WIDTH
        // 当拖动到开始跟结束的情况兼容
        const moveWidth = Math.min(Math.max(0, moveX + touch.left), barWidth)
        _offset(moveWidth)
      }
    }
    const handleMouseUp = () => {
      touch.initial = false
      _changePercent()
    }
    /* 滑动 点击的时候回调给音乐播放器的百分比计算函数 */
    const _changePercent = () => {
      if (!progressBarRef.value || !progressRef.value) return
      // 实际长度
      const barWidth: number = progressBarRef.value.clientWidth - BTN_WIDTH
      // 当前百分比=进度条长度/实际长度
      const curPercent: number = progressRef.value.clientWidth / barWidth
      props.percentChange(curPercent)
    }
    /* 点击事件,真实移动长度moveWidth = 点击的时候距离页面的x距离-灰色条距离左边的长度 */
    const handleClick = (e: MouseEvent) => {
      if (progressBarRef.value) {
        const rect: ClientRect = progressBarRef.value.getBoundingClientRect()
        const moveWidth: number = e.pageX - rect.left
        _offset(moveWidth)
        _changePercent()
      }
    }

    watchEffect(() => {
      const { percent } = toRefs(props)
      if (
        percent.value >= 0 &&
        percent.value <= 1 &&
        !touch.initial &&
        progressBarRef.value
      ) {
        // 计算不同手机用户的那个红色播放条可走的长度
        const barWidth = progressBarRef.value.clientWidth
        // 最终要移动的红色播放条的宽度
        const moveWidth = percent.value * barWidth
        _offset(moveWidth)
      }
    })
    return {
      progressBarRef,
      progressRef,
      progressBtnRef,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  /* .bar-time {
    font-size: 12px;
    color: #939393;
  } */

  .bar-inner {
    position: relative;
    width: 500px;
    height: 4px;
    margin: 0 10px;
    background: #e6e6e6;
    border-radius: 10px;

    .bar-progress {
      position: absolute;
      height: 100%;
      background: #ff4e4e;
      border-radius: 10px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .progress-btn {
      position: absolute;
      top: -2px;
      left: -1px;
      cursor: pointer;
      background: #ff4e4e;
      border-radius: 50%;
    }

    &:hover {
      .progress-btn {
        width: 8px;
        height: 8px;
      }
    }

    &.scale:hover {
      height: 6px;

      .progress-btn {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>

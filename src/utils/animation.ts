import { Ref } from 'vue'

const cubic = (value: number): number => Math.pow(value, 3)

const easeInOutCubic = (value: number) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export const scrollTop = (el: Ref<HTMLElement>, endTop = 0) => {
  if (!el.value) return
  const startTime = Date.now()
  const startValue = el.value.scrollTop
  // 因为直接改变scrollTop是没有动画效果的，所以只能通过
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    // 做一个500ms的动画
    const progress = (Date.now() - startTime) / 500
    // 时间还没到500
    if (progress < 1) {
      el.value.scrollTop = startValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      el.value.scrollTop = endTop * (Math.floor(document.documentElement.clientWidth / 1280))
    }
  }
  rAF(frameFunc)
}

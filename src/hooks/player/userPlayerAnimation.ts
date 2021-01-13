import animations from 'create-keyframe-animation'

/**
 * @description:计算偏移量跟缩放量动画
 * @param : {null}
 * @return: {x,y,scale}
 */
export const getPosAndScale = () => {
  // 左下角缩略图的宽度
  const targetWith = 48

  // 左下角缩略图中心的x位置
  const paddingLeft = 34

  // 左下角缩略图中心的位置y
  //   const paddingBottom = 44

  // 右上角缩小距离顶部的位置
  const paddingTop = 80

  // 大图也就是整个屏幕宽度的
  const width: number = window.innerWidth

  // 两个图中心的x距离
  const x: number = -(width / 2 - paddingLeft)

  // 两个图中心的y距离
  // 因为现在底部是固定的，之前是需要缩到mini的图里面，现在不需要了，而是在mini的前面
  const y: number = window.innerHeight - paddingTop - window.innerHeight / 2

  // 缩放比例
  const scale: number = targetWith / width
  return {
    x,
    y,
    scale
  }
}

export default function userPlayerAnimation () {
  const handleEnter = (el: HTMLElement, done: () => void) => {
    const { x, y, scale } = getPosAndScale()
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }
    animations.registerAnimation({
      name: 'enter',
      animation,
      presets: {
        duration: 300,
        easing: 'linear'
      }
    })
    animations.runAnimation(el, 'enter', done)
  }
  const handleAfterEnter = () => {
    animations.unregisterAnimation('enter')
  }
  const handleLeave = (el: HTMLElement, done: () => void) => {
    const { x, y, scale } = getPosAndScale()
    const animation = {
      0: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      },
      100: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      }
    }
    animations.registerAnimation({
      name: 'leave',
      animation,
      presets: {
        duration: 300,
        easing: 'linear'
      }
    })
    animations.runAnimation(el, 'leave', done)
  }
  const handleAfterLeave = () => {
    animations.unregisterAnimation('leave')
  }
  return {
    handleEnter,
    handleAfterEnter,
    handleLeave,
    handleAfterLeave
  }
}

export const translateCount = (count: number) => {
  const BASE = 10000
  const MAX = 100000
  if (count > MAX) {
    return `${Math.floor(count / BASE)}万`
  }
  return count
}

export const formatDate = (time: number, showYear = true) => {
  const date: Date = new Date(time)
  if (!showYear) {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日`
  }
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const formatTime = (time: number) => {
  const date: Date = new Date(time)
  if (date.getFullYear() === new Date().getFullYear()) {
    return `${(date.getMonth() + 1)}月${date.getDate()}日 ${date.getHours()}:${date.getSeconds()}`
  }
  return `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日 ${date.getHours()}:${date.getSeconds()}`
}

// 秒取整
export const formatDuration = (time: number) => {
  time = time / 1000 | 0
  const min = (time / 60 | 0).toString().padStart(2, '0')
  const second = (time % 60).toString().padStart(2, '0') // 不足两位的时候补零
  return `${min}:${second}`
}

export const combineArtist = (artists: Array<any>) => {
  return artists.map((artist) => {
    return artist.name
  }).join(' / ')
}

/*
  防抖函数
*/
let timeout
export const debounce = function (func: any, wait: number) {
  // 延迟执行函数
  const later = (args) => setTimeout(() => {
    // 延迟函数执行完毕，清空定时器。
    timeout = null
    // 延迟执行的情况下，函数会在延迟函数中执行。
    // 使用到之前缓存的参数和上下文
    // @ts-ignore
    func.apply(this, args)
  }, wait)
  const debounced = function (...params) {
    if (!timeout) {
      timeout = later(params)
    } else {
      clearTimeout(timeout)
      timeout = later(params)
    }
  }
  return debounced
}

export const translateCount = (count: number) => {
  const BASE = 10000
  const MAX = 100000
  if (count >= MAX) {
    return `${Math.floor(count / BASE)}万`
  }
  return count
}

export function formatDate (data: number, fmt = 'YYYY-MM-dd hh:mm:ss') {
  const date = data ? new Date(data) : new Date()
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')
  let format: string = fmt

  const o: any = {
    'M+': month,
    'd+': day,
    'h+': hour,
    'm+': minute,
    's+': second
  }
  if (/([Yy]+)/.test(format)) {
    format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length))
  }

  for (const key in o) {
    if (new RegExp('(' + key + ')').test(format)) {
      format = format.replace(RegExp.$1, o[key].substr(2 - RegExp.$1.length))
    }
  }
  if (year === new Date().getFullYear().toString() && format.includes('年')) {
    format = [format.split('年')[1]].join()
    if (month === (new Date().getMonth() + 1).toString().padStart(2, '0') && day === new Date().getDate().toString().padStart(2, '0')) {
      format = [format.split('日')[1]].join().trim()
    }
  }

  return format
}

// 秒取整
export const formatDuration = (time: number) => {
  time = time / 1000 | 0
  const min = (time / 60 | 0).toString().padStart(2, '0')
  const second = (time % 60).toString().padStart(2, '0')
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

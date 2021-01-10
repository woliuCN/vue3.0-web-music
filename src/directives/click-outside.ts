import { DirectiveBinding } from 'vue'
import { on } from '@/utils/dom'

type Callback = (e: MouseEvent) => void

type ExcludeList = Map<HTMLElement, {callback: Callback}>

const nodelist: ExcludeList = new Map()

// @ts-ignore
on(document, 'click', (e: MouseEvent) => {
  for (const { callback } of nodelist.values()) {
    callback(e)
  }
})

function createCallbackFn (el: any, binding: DirectiveBinding) {
  return function (click: MouseEvent) {
    const clickTarget = click.target as Node
    let execludeDom: Node
    // 待解决jsx里面绑定arg报错的原因
    if (binding.arg) {
      execludeDom = document.getElementById(binding.arg)
    } else {
      execludeDom = document.getElementById(binding.value.arg)
    }
    // 如果点击的元素是绑定的元素及其子元素的话则不会触发回调
    if (el.contains(clickTarget) || execludeDom.contains(clickTarget)) {
      return
    }
    binding.arg ? binding.value() : binding.value.value()
  }
}

const clickOutside = {
  beforeMount (el: any, binding: DirectiveBinding) {
    nodelist.set(el, { callback: createCallbackFn(el, binding) })
  },
  updated (el: any, binding: DirectiveBinding) {
    nodelist.set(el, { callback: createCallbackFn(el, binding) })
  },
  unmounted (el: any) {
    nodelist.delete(el)
  }
}

export default clickOutside

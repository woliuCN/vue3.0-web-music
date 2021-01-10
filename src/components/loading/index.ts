import { DirectiveBinding } from 'vue'
import Loading from './createLoading'
const vLoading = {
  mounted (el: any, binding: DirectiveBinding) {
    const instance = Loading({
      visible: binding.value
    })
    el.instance = instance
  },
  updated (el: any, binding: DirectiveBinding) {
    const instance = el.instance
    if (!instance) return
    if (binding.oldValue !== binding.value) {
      if (binding.value && !instance.visible.value) {
        instance.visible.value = true
      } else {
        instance.visible.value = false
      }
    }
  }
}

export default vLoading

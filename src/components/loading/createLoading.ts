import { createVNode, toRefs, reactive, h, render, VNode } from 'vue'

interface Options {
  visible: boolean;
}

function createLoadingComponent (options: Options) {
  let vm: VNode | null = null
  const data = reactive({
    visible: options.visible ? options.visible : false
  })
  const loadingComponent = {
    name: 'loading',
    setup () {
      return {
        ...toRefs(data)
      }
    },
    render () {
      return h('div', {
        style: {
          // @ts-ignore
          display: this.visible ? 'block' : 'none'
        },
        class: ['loading']
      }, [
        h('div'),
        h('div')
      ])
    }
  }
  vm = createVNode(loadingComponent)
  // 将模板编译为虚拟dom
  render(vm, document.createElement('div'))
  return {
    ...toRefs(data),
    get $el () {
      return vm?.el as HTMLElement
    }
  }
}

const Loading = function (options: Options) {
  const instance = createLoadingComponent(
    options
  )
  // 挂载
  document.body.appendChild(instance.$el)
  return instance
}

export default Loading

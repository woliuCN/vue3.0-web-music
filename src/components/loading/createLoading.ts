import { createVNode, toRefs, reactive, h, render, VNode, watch } from 'vue'

interface Options {
  visible: boolean;
}

function createLoadingComponent (options: Options) {
  let vm: VNode | null = null
  const data = reactive({
    visible: options.visible ? options.visible : false
  })

  function destorySelf () {
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el)
    }
  }
  const loadingComponent = {
    name: 'loading',
    setup () {
      watch(() => data.visible, (val: boolean) => {
        if (!val) {
          destorySelf()
        }
      })
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
  if (document.getElementsByClassName('loading')[0]) {
    document.body.removeChild(document.getElementsByClassName('loading')[0])
  }
  // 挂载
  document.body.appendChild(instance.$el)
  return instance
}

export default Loading

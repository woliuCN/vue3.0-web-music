<script lang="ts">
import {
  defineComponent,
  Ref,
  ComputedRef,
  VNode,
  Component,
  PropType,
  ComponentInternalInstance,
  ref,
  watch,
  getCurrentInstance,
  provide,
  onMounted,
  h
} from 'vue'
import TabNav from './TabNav.vue'
export interface TabsProps {
  // 选中的pane的name
  activeName: string;
  // 双向绑定
  modelValue: string;
  // 字体大小
  labelSize: number;
  // nav是否要绝对定位
  isAbsolute: boolean;
  // nav选中是否要变大
  isScale: boolean;
}

export interface PaneProps {
  label: string;
  name: string;
}

export interface Pane {
  uid: number;
  props: PaneProps;
  instance: ComponentInternalInstance;
  // pane实例属性的约束
  paneName: ComputedRef<string>;
  active: ComputedRef<boolean>;
}

export interface RootTabs {
  props: TabsProps;
  currentName: Ref<string>;
}

export type UpdatePaneCallback = (pane: Pane) => void;

export default defineComponent({
  components: {
    TabNav
  },
  name: 'tabs',
  props: {
    activeName: {
      type: String as PropType<string>,
      default: ''
    },
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    labelSize: {
      type: Number as PropType<number>,
      default: 15
    },
    isAbsolute: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isScale: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['tab-click', 'update:modelValue'],
  setup (props: TabsProps, ctx) {
    const currentName = ref<string>(
      props.modelValue || props.activeName || '0'
    )
    const panes = ref([])
    // 获取当前实例
    const instance = getCurrentInstance()
    const paneStatesMap = {}
    provide<RootTabs>('rootTabs', {
      props,
      currentName
    })
    provide<UpdatePaneCallback>('updatePaneState', (pane: Pane) => {
      paneStatesMap[pane.uid] = pane
    })
    watch(
      () => props.activeName,
      val => {
        setCurrentName(val)
      }
    )
    watch(() => props.modelValue, val => {
      setCurrentName(val)
    })

    // 双向绑定
    const changeCurrentName = (val: string) => {
      currentName.value = val
      ctx.emit('update:modelValue', val)
    }

    const setCurrentName = (val: string) => {
      if (currentName.value !== val) {
        changeCurrentName(val)
      }
    }

    const getPaneInstance = (
      vNode: VNode,
      paneInstanceList: ComponentInternalInstance[] = []
    ) => {
      Array.from((vNode.children || []) as ArrayLike<VNode>).forEach(
        (node: VNode) => {
          let type = node.type
          // 如果节点的类型是个component
          type = (type as Component).name || type
          if (type === 'tab-pane' && node.component) {
            paneInstanceList.push(node.component)
          }
        }
      )
      return paneInstanceList
    }
    const setPaneInstances = () => {
      if (ctx.slots.default) {
        // 获取当前组件实例相关的外层的节点
        const children = instance?.subTree.children
        // 查找对应的content下的pane
        const content = Array.from(children as ArrayLike<VNode>).find(
          ({ props }) => {
            if (props) {
              return props.class === 'tabs-content'
            }
          }
        )
        if (!content) return true
        const paneInstanceLits: Pane[] = getPaneInstance(content).map(
          (paneComponent: ComponentInternalInstance) => {
            return paneStatesMap[paneComponent.uid]
          }
        )
        panes.value = paneInstanceLits
      }
    }
    const handleTabClick = (tab: Pane, tabName: string, event: MouseEvent) => {
      setCurrentName(tabName)
      ctx.emit('tab-click', tab, tabName, event)
    }
    onMounted(() => {
      setPaneInstances()
    })
    return {
      currentName,
      panes,
      handleTabClick
    }
  },
  render () {
    const {
      currentName,
      panes,
      labelSize,
      isAbsolute,
      isScale,
      handleTabClick
    } = this
    const header = h(
      'div',
      {
        class: ['tabs-header']
      },
      [
        h(
          // 曲线救国，类型定义文件没有定义这个就很难受
          // @ts-ignore
          TabNav,
          {
            currentName,
            panes,
            labelSize,
            isAbsolute,
            isScale,
            onTabClick: handleTabClick
          }
        )
      ]
    )
    const panels = h(
      'div',
      {
        class: 'tabs-content'
      },
      this.$slots.default()
    )
    return h(
      'div',
      {
        class: ['tabs']
      },
      [header, panels]
    )
  }
})
</script>

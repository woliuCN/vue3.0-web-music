<script lang="ts">
import { defineComponent, PropType, h } from 'vue'
import { Pane } from './Index.vue'

export default defineComponent({
  name: 'tab-nav',
  props: {
    panes: {
      type: Array as PropType<Pane[]>,
      default: () => [] as Pane[]
    },
    currentName: {
      type: String as PropType<string>,
      default: ''
    },
    labelSize: {
      type: Number as PropType<number>
    },
    isAbsolute: {
      type: Boolean as PropType<boolean>
    },
    isScale: {
      type: Boolean as PropType<boolean>
    },
    onTabClick: {
      type: Function as PropType<
        (tab: Pane, tabName: string, ev: Event) => void
      >,
      default: () => {}
    }
  },
  render () {
    const {
      panes,
      currentName,
      labelSize,
      isAbsolute,
      isScale,
      onTabClick
    } = this
    const tabs = panes.map((pane: Pane) => {
      const tabLabel: string = pane.props.label
      const tabName: string = pane.props.name
      const isActive: boolean = currentName === tabName
      return h(
        'li',
        {
          class: [
            'tabs-nav-item',
            isActive ? 'active' : '',
            isScale ? 'scale' : ''
          ],
          style: { fontSize: `${labelSize}px` },
          onClick: (ev) => {
            onTabClick(pane, tabName, ev)
          }
        },
        [tabLabel]
      )
    })
    return h(
      'ul',
      {
        class: ['tabs-nav', isAbsolute ? 'absolute' : '']
      },
      [tabs]
    )
  }
})
</script>

<style lang="scss">
</style>

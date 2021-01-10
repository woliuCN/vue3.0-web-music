<template>
  <div v-if="shouldBeRender" :id="`pane-${paneName}`" class="tab-pane">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  getCurrentInstance,
  inject
} from 'vue'
import { RootTabs, UpdatePaneCallback } from './Index.vue'
export default defineComponent({
  name: 'tab-pane',
  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },
    name: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup (props) {
    const updatePaneState = inject<UpdatePaneCallback>('updatePaneState')
    const rootTabs = inject<RootTabs>('rootTabs')
    const instance = getCurrentInstance()
    const active = computed(() => {
      const active = rootTabs.currentName.value === props.name
      return active
    })
    const shouldBeRender = computed(() => {
      return active.value
    })
    const paneName = computed((): string => {
      return props.name
    })
    updatePaneState({
      uid: instance.uid,
      instance,
      props,
      active,
      paneName
    })
    return {
      paneName,
      shouldBeRender
    }
  }
})
</script>

<style scoped lang="scss">
</style>

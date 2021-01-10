<template>
  <ul class="tabs">
    <li
      v-for="tabItem in tabList"
      :key="tabItem.path"
      class="tabs-item"
      :class="{ active: tabItem.path === defaultActive }"
      @click="handleChangeActive(tabItem.path)"
    >
      {{ tabItem.content }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TabItem } from './type'
export default defineComponent({
  props: {
    defaultActive: {
      type: String as PropType<string>,
      required: true
    },
    tabList: {
      type: Array as PropType<TabItem[]>,
      default: []
    }
  },
  emits: ['on-change'],
  setup (props, context) {
    const handleChangeActive = (path: string) => {
      context.emit('on-change', path)
    }
    return {
      handleChangeActive
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 16px;
  background: #fff;

  .tabs-item {
    margin-right: 25px;
    cursor: pointer;

    &.active {
      position: relative;
      font-size: 20px;
      font-weight: bold;

      &::after {
        position: absolute;
        right: 0;
        bottom: -10px;
        left: 0;
        width: 80%;
        height: 3px;
        margin: auto;
        background: #ec4141;
        border-radius: 4px;
        content: "";
      }
    }
  }
}
</style>

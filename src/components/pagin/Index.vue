<template>
  <div class="pagin">
    <button type="button" class="btn-prev" @click.prevent="handlePrev">
      <i class="iconfont icon-preview-left"></i>
    </button>
    <ul class="pager" @click="handlePagerClick">
      <li
        v-if="pageCount > 0"
        :class="{ active: currentPage === 1, disabled }"
        class="pager-number"
      >
        1
      </li>
      <li v-if="showPrevMore" class="pager-more"></li>
      <li
        v-for="pager in pagers"
        :key="'pager' + pager"
        class="pager-number"
        :class="{ active: currentPage === pager }"
      >
        {{ pager }}
      </li>
      <li v-if="showNextMore" class="pager-more"></li>
      <li
        v-if="pageCount > 1"
        :class="{ active: currentPage === pageCount, disabled }"
        class="pager-number"
      >
        {{ pageCount }}
      </li>
    </ul>
    <button type="button" class="btn-prev" @click.prevent="handleNext">
      <i class="iconfont icon-preview-right"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchEffect, computed } from 'vue'
export default defineComponent({
  name: 'pagin',
  props: {
    // 当前页
    currentPage: {
      type: Number as PropType<number>,
      default: 1
    },
    // 总页数
    pageCount: {
      type: Number as PropType<number>
    },
    // 页面按钮的数量，当总页数超过该值时会折叠,不包含箭头与...
    pagerCount: {
      type: Number as PropType<number>,
      default: 7
    },
    onChange: {
      type: Function
    },
    disabled: Boolean
  },
  emits: ['change'],
  setup (props, { emit }) {
    const showPrevMore = ref<boolean>(false)
    const showNextMore = ref<boolean>(false)
    const pagers = computed(() => {
      const pagerCount = props.pagerCount
      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)
      // 页面按钮数的一半,判断是否需要显示省略号的依据
      const halfPagerCount = (pagerCount - 1) / 2
      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        // 当越过一半中心点重新以currentPage为中心点，这时候就得显示前...
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        // 同理可得右边的一半
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }
      const array = []
      // 前省略号存在而没有后省略好的情况，即中间的点就算到最后的点
      if (showPrevMore && !showNextMore) {
        // pagerCount - 2 除去前后两个点，剩下的就是所有点减去五个点的其实点开始
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor((pagerCount - 2) / 2)
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      // 如果小于pagerCount的时候
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }
      return array
    })

    watchEffect(() => {
      const pagerCount = props.pagerCount
      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)
      // 页面按钮数的一半,判断是否需要显示省略号的依据
      const halfPagerCount = (pagerCount - 1) / 2
      showPrevMore.value = false
      showNextMore.value = false
      if (pageCount > pagerCount) {
        // 当越过一半中心点重新以currentPage为中心点，这时候就得显示前...
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore.value = true
        }
        // 同理可得右边的一半
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore.value = true
        }
      }
    })
    const handlePagerClick = (event: UIEvent) => {
      const currentPage = Number(props.currentPage)
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
        return
      }
      const newPage = Number(target.textContent)
      if (newPage !== currentPage) {
        emit('change', newPage)
      }
    }

    const handlePrev = () => {
      const currentPage = Number(props.currentPage)
      if (currentPage === 1) {
        return
      }
      emit('change', currentPage - 1)
    }
    const handleNext = () => {
      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)
      if (currentPage === pageCount) {
        return
      }
      emit('change', currentPage + 1)
    }
    return {
      showPrevMore,
      showNextMore,
      pagers,
      handlePrev,
      handleNext,
      handlePagerClick
    }
  }
})
</script>

<style scoped lang="scss">
li {
  list-style: none;
}

.pagin {
  display: flex;
  align-items: center;
  justify-content: center;

  .pager {
    display: flex;
    align-items: center;

    .pager-number {
      display: flex;
      align-items: center;
      justify-content: center;

      /* width: 24px; */
      height: 24px;
      padding: 0 8px;
      margin: 0 5px;
      font-size: 13px;
      color: #333;
      cursor: pointer;
      border: 1px solid #f2f2f2;
      border-radius: 4px;

      &.active {
        font-weight: bold;
        color: #fff;
        background: #ed4141;
      }
    }

    .pager-more {
      position: relative;
      width: 24px;
      height: 24px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: "···";
        transform: translate(-50%, -50%);
      }
    }
  }

  .btn-prev,
  .btn-next {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 0 5px;
    color: #333;
    cursor: pointer;
    background: #fff;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    outline: none;
  }
}
</style>

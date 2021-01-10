<template>
  <div class="singer" ref="containerRef">
    <div class="singer-select">
      <div class="select-item">
        <span class="item-title">语种:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ text: item.value !== -1 }"
            v-for="item in singerAreas"
            :key="'area' + item.value"
          >
            <span
              class="conditions-text"
              :class="item.value === area ? 'active' : ''"
              @click="handleChangeConditons('area',item.value)"
              >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">分类:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ text: item.value !== -1 }"
            v-for="item in singerCategorys"
            :key="'area' + item.value"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === type }"
              @click="handleChangeConditons('type',item.value)"
              >
              {{ item.label }}
              </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">筛选:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in alphaTypes"
            :key="'area' + item.value"
          >
            <span
              class="conditions-text"
              :class="item.value === alpha ? 'active' : ''"
              @click="handleChangeConditons('alpha',item.value)"
              >
              {{ item.label }}
              </span>
          </div>
        </div>
      </div>
    </div>
    <div class="singer-list" v-loading="isLoading">
      <div class="list-item" v-for="item in singerLists" :key="item.id" @click="handleShowDetail(item.id)">
        <img
          :src="item.picUrl"
        />
        <div class="item-bottom">
          <span>{{item.name}}</span>
          <i class="iconfont icon-user"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import {
  SINGER_AREAS,
  SINGER_CATEGORYS,
  ALPHATYPES
} from '@/utils/constant'
import { useRouter } from 'vue-router'
import { getSingerLists } from '@/api/singer/index'
import { debounce } from '@/utils/util'
import { on, off } from '@/utils/dom'
export default defineComponent({
  setup () {
    const isLoading = ref<boolean>(false)
    const singerAreas = ref<Array<SingerSelectArgs>>(SINGER_AREAS)
    const singerCategorys = ref<Array<SingerSelectArgs>>(SINGER_CATEGORYS)
    const alphaTypes = ref<Array<SingerSelectArgs>>(ALPHATYPES)
    const singerLists = ref<Artist[]>([])
    const containerRef = ref<HTMLDivElement | null>(null)
    const conditons = reactive({
      type: -1,
      area: -1,
      alpha: '',
      currentPage: 1,
      more: false
    })
    const $router = useRouter()
    const getCurrentSingerLists = async () => {
      isLoading.value = true
      const { singers, more } = await getSingerLists(conditons.type, conditons.area, conditons.alpha, conditons.currentPage)
      if (more) {
        conditons.currentPage = conditons.currentPage + 1
        singerLists.value.push(...singers)
      }
      conditons.more = more
      isLoading.value = false
    }
    const handleChangeConditons = (key: string, value: string | number) => {
      conditons[key] = value
      conditons.currentPage = 1
      singerLists.value = []
      getCurrentSingerLists()
    }
    const scrollCallback = () => {
      const dom = document.getElementById('mainPage')
      const scrollTop = dom.scrollTop
      const scrollHeight = dom.scrollHeight
      const clientHeight = dom.clientHeight
      // 当整个滚动条的实际高度减去移动上去的高度加上块的高度小于十的时候就是到底了,即可以请求数据
      if ((scrollHeight - clientHeight - scrollTop) < 10 && conditons.more) {
        getCurrentSingerLists()
      }
    }
    const handleShowDetail = (id: number) => {
      $router.push(`/singer/${id}`)
    }
    onMounted(() => {
      getCurrentSingerLists()
      on(document.getElementById('mainPage'), 'scroll', debounce(scrollCallback, 1000))
    })
    onUnmounted(() => {
      off(document.getElementById('mainPage'), 'scroll')
    })
    return {
      isLoading,
      singerAreas,
      singerCategorys,
      alphaTypes,
      singerLists,
      containerRef,
      ...toRefs(conditons),
      handleChangeConditons,
      handleShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.singer {
  .singer-select {
    font-size: 13px;
    color: #666;

    .select-item {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      margin: 6px 0;

      .item-title {
        margin-right: 10px;
      }

      .item-conditions {
        flex: 1;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .conditions-wrapper {
          position: relative;
          width: 64px;
          margin-bottom: 15px;
          text-align: center;

          .conditions-text {
            padding: 3px 10px;
            cursor: pointer;
            border-radius: 25px;

            &.active {
              color: #ed4141;
              background: #fdf5f5;
            }
          }

          &.text {
            width: 78px !important;
          }

          &::after {
            position: absolute;
            top: 50%;
            right: 0;
            width: 1px;
            height: 12px;
            background: #e8e8e8;
            content: "";
            transform: translateY(-50%);
          }

          &:last-child::after {
            display: none;
          }
        }
      }
    }
  }

  .singer-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .list-item {
      flex: 0 0 15%;
      margin-right: 2%;
      margin-bottom: 20px;
      font-size: 13px;
      cursor: pointer;

      &:nth-of-type(6n + 0) {
        margin-right: 0;
      }

      > img {
        width: 100%;
      }

      .item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 24px;
        padding: 0 2px;

        .icon-user {
          padding: 2px;
          font-size: 14px;
          color: #fff;
          background: #ed4141;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

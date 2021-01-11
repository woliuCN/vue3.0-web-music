<template>
  <div class="mv">
    <header class="header">全部MV</header>
    <div class="mv-select">
      <div class="select-item">
        <span class="item-title">地区:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ text: item.value !== -1 }"
            v-for="item in areas"
            :key="'area' + item.value"
            @click="handleChangeCondition('area', item.value)"
          >
            <span
              class="conditions-text"
              :class="item.value === area ? 'active' : ''"
              >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">类型:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ text: item.value !== -1 }"
            v-for="item in types"
            :key="'area' + item.value"
            @click="handleChangeCondition('type', item.value)"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === type }"
              >
              {{ item.label }}
              </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">排序:</span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in orders"
            :key="'area' + item.value"
            @click="handleChangeCondition('order', item.value)"
          >
            <span
              class="conditions-text"
              :class="item.value === order ? 'active' : ''"
              >
              {{ item.label }}
              </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mv-list" v-loading="isLoading">
        <div class="list-item" v-for="item in mvList" :key="item.id">
          <mv-item :mvItem="item"/>
        </div>
    </div>
    <pagin
    :pageCount="pageCount"
    :pagerCount="9"
    :currentPage="currentPage"
    @change="handlePaginChange"
    />
  </div>
</template>

<script lang="ts">
import MvItem from '@/components/mv-item/Index.vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import {
  MV_AREAS,
  MV_ORDERS,
  MV_TYPES
} from '@/utils/constant'
import { getMvList } from '@/api/video/index'
export default defineComponent({
  components: {
    MvItem
  },
  setup () {
    const isLoading = ref<boolean>(false)
    const mvList = ref<Mv[]>([])
    const selectData = reactive({
      areas: MV_AREAS,
      types: MV_TYPES,
      orders: MV_ORDERS,
      area: '内地',
      type: '全部',
      order: '最新'
    })
    const paginData = reactive({
      currentPage: 1,
      pageCount: 0
    })

    const _getMvList = async () => {
      isLoading.value = true
      const res = await getMvList(selectData.area, selectData.type, selectData.order, paginData.currentPage)
      mvList.value = res.mvList
      paginData.pageCount = res.pageCount
      isLoading.value = false
    }
    const handleChangeCondition = (key: string, value: string) => {
      selectData[key] = value
      paginData.currentPage = 1
      _getMvList()
    }
    const handlePaginChange = (cur: number) => {
      paginData.currentPage = cur
      _getMvList()
    }
    _getMvList()
    return {
      isLoading,
      mvList,
      handlePaginChange,
      handleChangeCondition,
      ...toRefs(selectData),
      ...toRefs(paginData)
    }
  }
})
</script>

<style lang="scss" scoped>
.mv {
  padding: 2% 4%;

  .header {
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: bold;
  }

  .mv-select {
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
          width: 78px;
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

  .mv-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .list-item {
      flex: 0 0 32%;
      margin-bottom: 20px;
    }
  }
}
</style>

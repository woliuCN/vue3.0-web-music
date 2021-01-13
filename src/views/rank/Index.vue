<template>
  <div class="rank" v-loading="isLoading">
    <h1 class="rank-type">官方榜</h1>
    <div class="rank-offical">
      <official-item
        v-for="item in officalRanks"
        :officalRank="item"
        :key="item.id"
      />
      <singer-rank
        :singerRank="singerRank"
        v-if="Object.keys(singerRank).length"
      />
    </div>
    <h1 class="rank-type">全球榜</h1>
    <div class="rank-global">
      <global-item
        v-for="item in globalRanks"
        :globalRank="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import OfficialItem from './components/OfficialItem.vue'
import GlobalItem from './components/GlobalItem.vue'
import SingerRank from './components/SingerRank.vue'
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { getRanksInfo } from '@/api/rank/index'

interface RankInfo {
  officalRanks: CommonRank[];
  globalRanks: CommonRank[];
  singerRank: SingerRank | object;
}

export default defineComponent({
  components: {
    OfficialItem,
    GlobalItem,
    SingerRank
  },
  setup () {
    const isLoading = ref<Boolean>(false)
    const data = reactive<RankInfo>({
      officalRanks: [],
      globalRanks: [],
      singerRank: {}
    })
    onMounted(async () => {
      isLoading.value = true
      const {
        officalRanks,
        globalRanks,
        singerRank
      }: any = await getRanksInfo()
      data.officalRanks = officalRanks
      data.globalRanks = globalRanks
      data.singerRank = singerRank
      isLoading.value = false
    })
    return {
      isLoading,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.rank {
  .rank-type {
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
  }

  .rank-global {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>

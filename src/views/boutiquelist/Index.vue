<template>
  <div class="boutique" v-loading="isLoading">
    <h1 class="subtitle">
      精品歌单
    </h1>
    <div class="bouique-list">
        <div class="bouique-item" v-for="item in currentBoutiquelists" :key="item.id" @click="handleShowDetail(item.id)">
            <div class="item-left">
                <img :src="item.picUrl">
                <i class="iconfont icon-choiceness-double"></i>
                <div class="item-count">
                    <i class="iconfont icon-playlist-play"></i>
                    <span>{{item.playCount}}</span>
                </div>
                <div class="item-decorate">
                    <i className="iconfont icon-play"></i>
                </div>
            </div>
            <div class="item-right">
                <h1 class="title">{{item.name}}</h1>
                <div class="creator">{{item.nickName}}</div>
                <p class="desc">{{item.copywriter}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { playlistStore } from '@/store/modules/playlist'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const $router = useRouter()
    const currentBoutiquelists = computed<PlayListItem[]>(() => playlistStore.currentBoutiquelists)
    const handleShowDetail = (id: number) => {
      $router.push(`/playList/${id}`)
    }
    onMounted(() => {
      if (!currentBoutiquelists.value.length) {
        $router.push('/playList')
      }
    })
    return {
      currentBoutiquelists,
      handleShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.boutique {
  .subtitle {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    cursor: pointer;
  }

  .bouique-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .bouique-item {
        flex: 0 0 32%;
        display: flex;
        align-items: center;
        margin-right: 2%;
        margin-bottom: 20px;
        cursor: pointer;

        .item-left {
            flex: 0 0 132px;
            position: relative;

            >img {
                width: 100%;
            }

            .icon-choiceness-double {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                font-size: 18px;
                color: #fff;
                transform: rotateZ(-45deg);
            }

            .item-count {
                position: absolute;
                top: 4px;
                right: 8px;
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #fff;
            }

            .item-decorate {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 28px;
                height: 28px;
                line-height: 28px;
                color: #ec4141;
                text-align: center;
                background: rgba(253, 253, 253, 0.9);
                border-radius: 50%;
                opacity: 0;
                transform: translate(-50%, -50%);
                transition: opacity .3s ease-in-out ;

                .icon-play {
                    position: relative;
                    top: -1px;
                    left: 2px;
                    font-size: 13px;
                }
            }

            &::after {
                position: absolute;
                top: 0;
                left: 0;
                border-color: #f3b068 transparent transparent #f3b068;
                border-style: dashed;
                border-width: 15px;
                border-top-left-radius: 4px;
                content: '';
            }

            &:hover {
                .item-decorate {
                    opacity: 1;
                }
            }
        }

        .item-right {
            margin-left: 10px;

            .title {
                font-size: 14px;
                @include noWrap(180px);
            }

            .creator {
                margin: 20px 0 30px 0 ;
                font-size: 12px;
                color: #999;
            }

            .desc {
                font-size: 12px;
                font-weight: 100;
                color: #cfcfcf;
                @include noWrap(180px);
            }
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
    }
  }
}
</style>

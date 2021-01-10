<template>
  <div class="album">
      <div class="album-cover">
        <img v-if="album.isTop" src="@/assets/images/top.png">
        <template v-else >
            <img :src="album.picUrl">
            <div class="mask"></div>
            <div class="publish-time" >{{album.publishTime}}</div>
        </template>
      </div>
      <div class="album-songs">
          <h1 class="songs-header">
            <span>{{ album.name }}</span>
            <div class="header-options">
                <i class="iconfont icon-play-double"></i>
                <div class="divider"></div>
                <i class="iconfont icon-player-collect"></i>
            </div>
          </h1>
          <div>
            <song-list :songs="(isShowAll || !album.isTop) ? album.songs : album.songs.slice(0, 10)" :showTitle="false"/>
            <div class="show-all" v-if="album.isTop" @click="isShowAll = !isShowAll">
                <span v-if="!isShowAll">查看全部50首</span>
                <span v-else>显示前10首</span>
                <i class="iconfont icon-right"></i>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import SongList from '@/components/song-list/Index.vue'
export default defineComponent({
  props: {
    album: {
      type: Object as PropType<Album>,
      default: {}
    }
  },
  components: {
    SongList
  },
  setup () {
    const isShowAll = ref<boolean>(false)
    return {
      isShowAll
    }
  }
})
</script>

<style lang="scss" scoped>
    .album {
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;

        .album-cover {
            position: relative;
            flex: 0 0 auto;
            width: 152px;
            cursor: pointer;

            >img {
                width: 100%;
            }

            .mask {
                position: absolute;
                top: -12px;
                right: -26px;
                z-index: -1;
                width: 178px;
                height: 178px;
                background: url('../../../assets/images/album.png');
                background-position: 12px;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .publish-time {
                font-size: 12px;
                line-height: 1.5;
                color: #666;
                text-indent: .5em;
            }
        }

        .album-songs {
            flex: 1;
            margin-left: 80px;

            .songs-header {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: bold;

                .header-options {
                    display: flex;
                    align-items: center;
                    margin-left: 30px;
                    font-weight: initial;

                    .iconfont {
                        font-size: 24px;
                        color: #666;
                        cursor: pointer;
                    }

                    .divider {
                        width: 1px;
                        height: 12px;
                        margin: 0 10px ;
                        background: #ddd;
                    }
                }
            }

            .show-all {
                height: 36px;
                padding: 0 10px;
                font-size: 12px;
                line-height: 36px;
                color: #999;
                text-align: right;
                cursor: pointer;
                background: #f9f9f9;

                .iconfont {
                    font-size: 12px;
                }
            }
        }
    }
</style>

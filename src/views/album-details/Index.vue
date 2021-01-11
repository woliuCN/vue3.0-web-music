<template>
  <div class="details" v-loading="isLoading">
    <div class="details-top">
      <div class="top-cover">
        <img :src="detailInfo.coverImgUrl" />
        <div class="mask"></div>
      </div>
      <div class="top-content">
        <h1 class="content-title">
          <span>专辑</span>
          {{ detailInfo.name }}
        </h1>
        <div class="content-options">
          <div class="options-item light">
            <i class="iconfont icon-lyric-play"></i>
            <span>播放全部</span>
            <i class="iconfont icon-plus"></i>
          </div>
          <div class="options-item">
            <i class="iconfont icon-player-collect"></i>
            <span>收藏({{ detailInfo.subscribedCount }})</span>
          </div>
          <div class="options-item">
            <i class="iconfont icon-share"></i>
            <span>分享({{ detailInfo.shareCount }})</span>
          </div>
          <div class="options-item">
            <i class="iconfont icon-player-download"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="content-artist">
          <span class="label">歌手 : </span>
          <span class="value">{{ detailInfo.artistName }}</span>
        </div>
        <div class="content-time">
          <span class="label">时间 : </span> {{ detailInfo.publishTime }}
        </div>
      </div>
    </div>
    <div class="details-bottom">
      <tabs v-model="activeName">
        <tab-pane label="歌曲列表" name="songList">
          <song-list :songs="detailInfo.songs" />
        </tab-pane>
        <tab-pane :label="`评论(${total || 0})`" name="songComment">
          <div class="bottom-comment">
            <div class="comment-box">
              <textarea maxlength="140" rows="4" class="box-input"></textarea>
              <div class="box-options">
                <div class="options-left">
                  <i class="iconfont icon-emotional"></i>
                  <i class="iconfont icon-at"></i>
                  <i class="iconfont icon-well"></i>
                </div>
                <div class="options-right">评论</div>
              </div>
            </div>
            <comments
              :hotComments="hotComments"
              :comments="comments"
              :total="total"
            />
            <pagin
              :pageCount="pageCount"
              :pagerCount="9"
              :currentPage="currentPage"
              @change="handlePaginChange"
            />
          </div>
        </tab-pane>
        <tab-pane label="专辑详情" name="description">
            <div class="bottom-description">
                <h1 class="title">专辑介绍</h1>
                <p class="item" v-for="(item, index) in detailInfo.description" :key="'desc'+ index">
                    {{item}}
                </p>
            </div>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import SongList from '@/components/song-list/Index.vue'
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute } from 'vue-router'
import { getAlbumDetails, getAlbumComments } from '@/api/album/index'
export default defineComponent({
  components: {
    SongList
  },
  setup () {
    const isLoading = ref<boolean>(false)
    const activeName = ref<string>('songList')
    const detailInfo = ref<object>({})
    const data = reactive({
      hotComments: [],
      comments: [],
      total: 0,
      pageCount: 0,
      currentPage: 1
    })
    const $route = useRoute()
    let id = Number($route.params.id)
    const handlePaginChange = (cur: number) => {
      data.currentPage = cur
      getComments()
    }
    const getComments = async () => {
      isLoading.value = true
      const { hotComments, comments, total, pageCount } = await getAlbumComments(
        id,
        data.currentPage
      )
      data.hotComments = hotComments
      data.comments = comments
      data.total = total
      data.pageCount = pageCount
      isLoading.value = false
    }
    const init = async () => {
      isLoading.value = true
      detailInfo.value = await getAlbumDetails(id)
      await getComments()
      isLoading.value = false
    }
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      id = Number(to.params.id)
      init()
    })
    onMounted(() => {
      init()
    })
    return {
      isLoading,
      activeName,
      detailInfo,
      handlePaginChange,
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang="scss">
/deep/.tabs-header {
  padding: 0 2.5%;
}

.details {
  .details-top {
    display: flex;
    align-items: flex-start;
    padding: 2% 2.5%;

    .top-cover {
      position: relative;
      flex: 0 0 auto;
      width: 184px;
      margin-right: 60px;

      > img {
        width: 100%;
      }

      .mask {
        position: absolute;
        top: -14px;
        right: -36px;
        z-index: -1;
        width: 220px;
        height: 220px;
        background: url("../../assets/images/album.png");
        background-position: 12px;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }

    .top-content {
      flex: 1;

      .content-title {
        font-size: 23px;
        font-weight: bold;

        > span {
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          font-weight: 400;
          color: #ec4141;
          vertical-align: middle;
          border: 1px solid #ec4141;
          border-radius: 4px;
        }
      }

      .content-options {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 14px;
        color: #444;

        .options-item {
          display: flex;
          align-items: center;
          padding: 4px 14px;
          margin-right: 10px;
          cursor: pointer;
          border: 1px solid #e1e1e1;
          border-radius: 25px;

          .iconfont {
            margin-right: 4px;
            font-size: 22px;
            color: #444;
          }

          &.light {
            padding-right: 8px;
            color: #fff;
            background: #ec4141;
            border: none;

            > span {
              position: relative;

              &::after {
                position: absolute;
                top: -6px;
                right: -10px;
                width: 1px;
                height: 26px;
                background: #fefefe3d;
                content: "";
              }
            }

            .iconfont {
              color: #fff;
            }

            .icon-plus {
              margin-right: 0;
              margin-left: 16px;
            }
          }
        }
      }

      .content-artist,
      .content-time {
        font-size: 13px;
        line-height: 2;
        color: #555;

        .label {
          color: #444;
        }
      }

      .content-artist {
        .value {
          color: #5480b1;
          cursor: pointer;
        }
      }
    }
  }

  .details-bottom {
    .bottom-comment {
      padding: 2% 2.5%;

      .comment-box {
        .box-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 13px;
          color: #333;
          border: 1px solid #e1e1e1;
          border-radius: 8px;
          outline: none;
          box-sizing: border-box;
          resize: none;
        }

        .box-options {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .options-left {
            .iconfont {
              margin-right: 6px;
              font-size: 24px;
              color: #444;
              cursor: pointer;
            }
          }

          .options-right {
            padding: 8px 16px;
            font-size: 14px;
            color: #444;
            border: 1px solid #e1e1e1;
            border-radius: 25px;
          }
        }
      }
    }

    .bottom-description {
        padding: 2% 2.5%;
        font-size: 14px;
        line-height: 2;

        .title {
            font-weight: bold;
        }

        .item {
            font-weight: 200;
            color: #666;
            text-indent: 2em;
        }
    }
  }
}
</style>

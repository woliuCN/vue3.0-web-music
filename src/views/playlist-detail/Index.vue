<template>
  <div class="details" v-loading="isLoading">
    <div class="details-top">
      <img class="top-cover" :src="detailInfo.coverImgUrl" />
      <div class="top-content">
        <h1 class="content-title">
          <span>歌单</span>
          {{ detailInfo.name }}
        </h1>
        <div class="content-provider">
          <img :src="detailInfo.avatarUrl" />
          <span class="provider-name">{{ detailInfo.nickname }}</span>
          <span>{{ detailInfo.createTime }}创建</span>
        </div>
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
        <div class="content-tags" v-if="detailInfo.tags">
          <span class="label">标签 : </span>
          <span class="tag">{{ detailInfo.tags }}</span>
        </div>
        <div class="content-count">
          <span class="label">歌曲 : </span> {{ detailInfo.trackCount }} &nbsp;
          <span class="label">播放 : </span> {{ detailInfo.playCount }}
        </div>
        <div class="content-desc">
          <span class="label">简介 : </span>
          <i
            :class="`iconfont ${showDescMore ? 'icon-up' : 'icon-down-2'}`"
            @click="showDescMore = !showDescMore"
          ></i>
          {{ detailInfo.subDescription }}<span v-if="!showDescMore">...</span>
          <p v-if="showDescMore" v-html="detailInfo.description"></p>
        </div>
      </div>
    </div>
    <div class="details-bottom">
      <tabs v-model="activeName">
        <tab-pane label="歌曲列表" name="songList">
          <song-list :songs="detailInfo.songs" />
        </tab-pane>
        <tab-pane
          :label="`评论(${detailInfo.commentCount || 0})`"
          name="songComment"
        >
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
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import SongList from '@/components/song-list/Index.vue'
import { useRoute } from 'vue-router'
import {
  PlaylistDetail,
  getPlayListDetails,
  getPlayListComments
} from '@/api/playlist/index'
export default defineComponent({
  components: {
    SongList
  },
  emits: ['pagin-change'],
  setup (props, context) {
    const isLoading = ref<boolean>(false)
    const activeName = ref<string>('songList')
    const showDescMore = ref<boolean>(false)
    const detailInfo = ref<Partial<PlaylistDetail>>({})
    const commentData = reactive({
      hotComments: [],
      comments: [],
      total: 0,
      pageCount: 0,
      currentPage: 1
    })
    const $route = useRoute()
    const id = Number($route.params.id)
    const handlePaginChange = (cur: number) => {
      context.emit('pagin-change')
      commentData.currentPage = cur
      getComments()
    }
    const handleToggleShowDescMore = () => {
      showDescMore.value = !showDescMore.value
    }
    const getComments = async () => {
      const {
        hotComments,
        comments,
        total,
        pageCount
      } = await getPlayListComments(id, commentData.currentPage)
      commentData.hotComments = hotComments
      commentData.comments = comments
      commentData.total = total
      commentData.pageCount = pageCount
    }
    const init = async () => {
      isLoading.value = true
      detailInfo.value = await getPlayListDetails(id)
      await getComments()
      isLoading.value = false
    }
    onMounted(() => {
      init()
    })
    return {
      isLoading,
      activeName,
      showDescMore,
      detailInfo,
      handlePaginChange,
      handleToggleShowDescMore,
      ...toRefs(commentData)
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
      flex: 0 0 auto;
      width: 184px;
      margin-right: 20px;
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

      .content-provider {
        display: flex;
        align-items: center;
        height: 50px;
        font-size: 12px;
        color: #666;

        > img {
          width: 32px;
          border-radius: 50%;
        }

        .provider-name {
          margin: 0 5px;
          color: #5480b1;
          cursor: pointer;
        }
      }

      .content-options {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
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

      .content-tags,
      .content-desc,
      .content-count {
        font-size: 13px;
        line-height: 2;
        color: #555;

        .label {
          color: #444;
        }
      }

      .content-tags {
        .tag {
          color: #5480b1;
          cursor: pointer;
        }
      }

      .content-desc {
        position: relative;
        padding-right: 14px;

        .iconfont {
          position: absolute;
          top: -10px;
          right: 0;
          font-size: 22px;
          color: #999;
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
  }
}
</style>

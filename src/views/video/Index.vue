<template>
  <div class="video" ref="divRef">
    <div class="video-left">
      <h1 class="title" @click="handleBack">
        <i class="iconfont icon-preview-left"></i>
        <span>{{ type ? "视频" : "MV" }}详情</span>
      </h1>
      <video
        width="640"
        height="360"
        autoPlay="autoPlay"
        controls="controls"
        :poster="videoInfo.posterUrl"
        :src="videoInfo.url"
      />
      <div class="video-info">
        <div class="info-creator">
          <img :src="videoInfo.avatarUrl" />
          <span>{{ videoInfo.creatorName }}</span>
        </div>
        <div class="info-desc">
          <h1 class="name">
            {{ videoInfo.name }}
            <i
              :class="`iconfont ${showIntro ? 'icon-up' : 'icon-down-2'}`"
              @click="showIntro = !showIntro"
            ></i>
          </h1>
          <div class="count">
            发布: {{ videoInfo.publishTime }} 播放: {{ videoInfo.playCount }}次
          </div>
          <p class="intro" v-if="showIntro">
            {{ videoInfo.intro }}
          </p>
        </div>
        <ul>
          <li class="group" v-for="item in videoInfo.videoGroup" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
        <ul>
          <li class="option">
            <i class="iconfont icon-zan"></i>
            <span>赞({{ videoInfo.likedCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-player-collect"></i>
            <span>收藏({{ videoInfo.subCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-share"></i>
            <span>分享({{ videoInfo.shareCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-player-download"></i>
            <span>下载MV</span>
          </li>
        </ul>
      </div>
      <div class="video-comment">
        <h1 class="title">
          评论<span> ({{ total }}) </span>
        </h1>
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
          style="margin-bottom: 10px;"
          :pageCount="pageCount"
          :pagerCount="9"
          :currentPage="currentPage"
          @change="handlePaginChange"
        />
      </div>
    </div>
    <div class="video-right">
      <h1 class="title">相关推荐</h1>
      <ul>
        <li
          class="related-video"
          v-for="item in relatedVideo"
          :key="item.id"
          @click="handleChangeVideo(item.id)"
        >
          <div class="video-cover">
            <img :src="item.coverUrl" />
            <div class="count">
              <i class="iconfont icon-playlist-play"></i>
              <span>{{ item.playCount }}</span>
            </div>
            <div class="duration">{{ item.durationStr }}</div>
          </div>
          <div class="video-info">
            <p class="info-title">{{ item.title }}</p>
            <div class="info-creator">by {{ item.creator }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
  useRouter
} from 'vue-router'
import {
  getMvDetail,
  getVideoDetail,
  getVideoComment,
  getMvComment,
  getRelatedVideo
} from '@/api/video/index'
import { scrollTop } from '@/utils/animation'
export default defineComponent({
  setup () {
    const reg = /[a-zA-Z]/g
    const $route = useRoute()
    const $router = useRouter()
    const type = ref(0) // 0是mv 1是视频
    const showIntro = ref(false)
    const videoInfo = ref({})
    const relatedVideo = ref([])
    const divRef = ref<HTMLDivElement | null>(null)
    const commentData = reactive({
      hotComments: [],
      comments: [],
      currentPage: 1,
      total: 0,
      pageCount: 0,
      id: null
    })
    const getComments = async () => {
      const id = commentData.id
      const func = type.value ? getVideoComment : getMvComment
      const { hotComments, comments, total, pageCount } = await func(
        id,
        commentData.currentPage
      )
      commentData.hotComments = hotComments
      commentData.comments = comments
      commentData.total = total
      commentData.pageCount = pageCount
    }
    const init = async (id: string) => {
      if (type.value) {
        videoInfo.value = await getVideoDetail(id as string)
        relatedVideo.value = await getRelatedVideo(id as string)
      } else {
        videoInfo.value = await getMvDetail(Number(id))
        relatedVideo.value = await getRelatedVideo(Number(id))
      }
      getComments()
    }
    const handleBack = () => {
      $router.go(-1)
    }
    const handleChangeVideo = (id: number | string) => {
      commentData.currentPage = 1
      $router.push(`/video/${id}`)
    }
    const handlePaginChange = (cur: number) => {
      scrollTop(divRef, 500)
      commentData.currentPage = cur
      getComments()
    }
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      commentData.id = to.params.id
      type.value = reg.test(to.params.id as string) ? 1 : 0
      init(to.params.id as string)
    })
    onMounted(() => {
      const id = $route.params.id
      commentData.id = id
      type.value = reg.test(id as string) ? 1 : 0
      init(id as string)
    })
    return {
      divRef,
      type,
      showIntro,
      videoInfo,
      relatedVideo,
      handleBack,
      handlePaginChange,
      handleChangeVideo,
      ...toRefs(commentData)
    }
  }
})
</script>

<style lang="scss" scoped>
.video {
  position: fixed;
  top: $header-height;
  bottom: 0;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 12%;
  overflow: auto;
  background: #fff;
  box-sizing: border-box;

  .title {
    height: 60px;
    font-size: 17px;
    font-weight: bold;
    line-height: 60px;
    cursor: pointer;

    .iconfont {
      font-size: 20px;
      font-weight: initial;
      color: #666;
    }
  }

  .video-left {
    flex: 0 0 640px;

    > video {
      outline: none;
    }

    .video-info {
      margin: 16px 0;

      .info-creator {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
        color: #666;
        cursor: pointer;

        > img {
          width: 52px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }

      .info-desc {
        .name {
          font-size: 22px;
          font-weight: bold;
          color: #444;

          .iconfont {
            font-size: 22px;
            vertical-align: sub;
            cursor: pointer;
          }
        }

        .count {
          margin: 10px 0;
          font-size: 12px;
          color: #dfdfdf;
        }

        .intro {
          font-size: 12px;
          line-height: 1.5;
          @include multipleNoWrap(4);
        }
      }

      .option {
        display: inline-flex;
        align-items: center;
        padding: 4px 24px;
        margin: 16px 0;
        margin-right: 10px;
        font-size: 13px;
        color: #444;
        cursor: pointer;
        border: 1px solid #e1e1e1;
        border-radius: 25px;

        .iconfont {
          margin-right: 4px;
          font-size: 22px;
          color: #444;
        }
      }

      .group {
        display: inline-block;
        padding: 4px 8px;
        margin: 16px 0;
        margin-right: 4px;
        font-size: 12px;
        color: #444;
        cursor: pointer;
        background: #f1f1f1;
        border-radius: 10px;
      }
    }

    .video-comment {
      margin-top: 40px;

      .title {
        font-size: 20px;

        > span {
          font-size: 12px;
          font-weight: initial;
          color: #aaa;
        }
      }

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

  .video-right {
    flex: 1;
    margin-left: 30px;

    .related-video {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      cursor: pointer;

      .video-cover {
        position: relative;

        > img {
          width: 148px;
        }

        .count {
          position: absolute;
          top: 4px;
          right: 10px;
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #fff;
        }

        .duration {
          position: absolute;
          right: 8px;
          bottom: 6px;
          font-size: 12px;
          color: #fff;
        }
      }

      .video-info {
        margin-left: 10px;
        font-size: 13px;

        .info-title {
          height: 40px;
          margin: 10px 0;
          line-height: 1.5;
          @include multipleNoWrap(2);
        }

        .info-creator {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>

<template>
  <div class="comment">
    <div class="comment-avator">
      <img
        :src="comment.avatarUrl"
      />
    </div>
    <div class="comment-content">
      <p class="content-top">
        <span class="nick-name">{{comment.name}}:</span>
        {{comment.content}}
      </p>
      <p v-if="comment.beReplied.length" class="content-top replied">
        <span class="nick-name">@{{comment.beReplied[0].name}}:</span>
        {{comment.beReplied[0].content}}
      </p>
      <div class="content-bottom">
        <span class="bottom-time">{{comment.time}}</span>
        <div class="bottom-options">
          <span class="option">
            <i class="iconfont icon-zan"></i>
            <span>{{comment.likedCount}}</span>
          </span>
          <span class="option">
            <i class="iconfont icon-share"></i>
          </span>
          <span class="option">
            <i class="iconfont icon-comment"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    comment: {
      type: Object as PropType<Comment>,
      default: {}
    }
  }
})
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  font-size: 12px;
  color: #555;
  border-bottom: 1px solid #f2f2f2;

  .comment-avator {
    flex: 0 0 36px;
    margin-right: 15px;

    > img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .comment-content {
    flex: 1;

    .content-top {
      line-height: 2;

      .nick-name {
        color: #5480b1;
      }

      &.replied {
        padding: 5px 10px;
        margin: 5px 0;
        background: #f2f2f2;
        border-radius: 2px;
        box-sizing: content-box;
      }
    }

    .content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .bottom-time {
        color: #666;
      }

      .bottom-options {
        display: flex;

        .option {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0 10px;
          cursor: pointer;

          .iconfont {
            font-size: 18px;
            vertical-align: middle;
          }

          &::after {
            position: absolute;
            top: 50%;
            right: -12px;
            width: 1px;
            height: 12px;
            background: #e2e2e2;
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
}
</style>

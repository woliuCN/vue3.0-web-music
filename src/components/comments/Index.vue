<template>
  <div class="comments">
    <h1  v-if="hotComments.length" class="title">精彩评论</h1>
    <div v-if="hotComments.length" class="comments-list">
      <comment-item v-for="item in hotComments" :comment="item" :key="item.commentId" />
    </div>
    <h1 class="title">最新评论({{total}})</h1>
    <div class="comments-list">
      <comment-item v-for="item in comments" :comment="item" :key="item.commentId" />
    </div>
  </div>
</template>

<script lang="ts">
import CommentItem from './CommentItem.vue'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  components: {
    CommentItem
  },
  props: {
    hotComments: {
      type: Array as PropType<Comment[]>,
      default: []
    },
    comments: {
      type: Array as PropType<Comment[]>,
      default: []
    },
    total: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup () {
  }
})
</script>

<style lang="scss" scoped>
.comments {
  margin: 20px 0;

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .comments-list {
    margin-bottom: 50px;
  }
}
</style>

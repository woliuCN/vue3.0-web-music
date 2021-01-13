import { AxiosResponse } from 'axios'
import { formatDate } from '@/utils/util'
import { COMMENT_LIMIT } from '@/utils/constant'

export const convertComments = (res: AxiosResponse<any>) => {
  let { hotComments, comments, total } = res.data
  if (hotComments && hotComments.length > 0) {
    hotComments = hotComments.map((comment: any) => {
      let beReplied: Replied[] = []
      if (comment.beReplied.length) {
        beReplied = comment.beReplied.map(item => {
          return {
            id: item.user.userId,
            name: item.user.nickname,
            commentId: item.commentId,
            avatarUrl: item.user.avatarUrl,
            time: formatDate(item.time, 'YYYY年MM月dd日 hh:mm'),
            likedCount: item.likedCount,
            content: item.content
          }
        })
      }
      return {
        id: comment.user.userId,
        name: comment.user.nickname,
        commentId: comment.commentId,
        avatarUrl: comment.user.avatarUrl,
        time: formatDate(comment.time, 'YYYY年MM月dd日 hh:mm'),
        likedCount: comment.likedCount,
        content: comment.content,
        beReplied
      }
    })
  }

  comments = comments.map((comment: any) => {
    let beReplied: Replied[] = []
    if (comment.beReplied.length) {
      beReplied = comment.beReplied.map(item => {
        return {
          id: item.user.userId,
          name: item.user.nickname,
          commentId: item.commentId,
          avatarUrl: item.user.avatarUrl,
          time: formatDate(item.time, 'YYYY年MM月dd日 hh:mm'),
          likedCount: item.likedCount,
          content: item.content
        }
      })
    }
    return {
      id: comment.user.userId,
      name: comment.user.nickname,
      commentId: comment.commentId,
      avatarUrl: comment.user.avatarUrl,
      time: formatDate(comment.time, 'YYYY年MM月dd日 hh:mm'),
      likedCount: comment.likedCount,
      content: comment.content,
      beReplied
    }
  })
  return {
    hotComments: hotComments || [],
    comments,
    total,
    pageCount: total % COMMENT_LIMIT ? Math.floor(total / COMMENT_LIMIT) + 1 : total / COMMENT_LIMIT
  }
}

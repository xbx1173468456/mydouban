<template>
  <div class="comment">
    <div class="hot-comment">
      <div class="hot-header">精彩评论</div>
      <div class="comment-item" v-for="(comment, i) in hotComments" :key="i">
        <img v-lazy="comment.user.avatarUrl" class="pic" width="50" height="50">
        <div class="content">
          <div class="content-top">
            <p class="user-name">{{comment.user.nickname}}：</p>
            <p class="txt">{{comment.content}}</p>
          </div>
          <div class="content-bottom">
            <span class="time">{{comment.time | formatDate}}</span>
            <span class="likedCount">{{comment.likedCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!comments.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import { getComment } from 'api/index'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      comments: [],
      hotComments: [],
      id: this.$route.params.id
    }
  },
  created() {
    this._getComment()
  },
  methods: {
    _getComment() {
      getComment(this.id).then(res => {
        if (res.data.code === 200) {
          this.comments = res.data.comments
          this.hotComments = res.data.hotComments
        }
      })
    }
  },
  filters: {
    formatDate(time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const h = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      return `${y}年${m}月${d}日 ${h}:${minute}`
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/mixin"
  @import "~assets/stylus/variable"
  .comment
    position: relative
    overflow-y: scroll
    .hot-comment
      .hot-header
        height: 34px
        line-height: 34px
        font-size: $font-size-medium
        border-bottom: 1px solid $color-text-ll
        padding-left: 15px
      .comment-item
        display: flex
        flex-direction: row
        padding: 15px
        font-size: $font-size-medium
        border-bottom: 1px solid $color-text-d
        .pic
          width: 50px
          height: 50px
          border-radius: 50%
          margin-right: 15px
        .content
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-between
          .user-name
            margin-bottom: 10px;
          .txt
            line-height: 18px
          .content-bottom
            margin-top: 10px
            display: flex
            justify-content: space-between
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translate3d(0, -50%, 0)
</style>

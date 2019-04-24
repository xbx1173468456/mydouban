<template>
  <div class="recommend">
    <div class="rankList">
      <div class="rank-title">特色榜</div>
      <ul class="rank-content">
        <li class="rank-item" v-for="(item, i) in rankList" :key="i" @click.stop="selectItem(item)">
          <img v-lazy="item.coverImgUrl">
          <p class="name">{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="albumsList" v-show="rankList.length">
      <div class="topList-title">热门歌单</div>
      <ul class="topList-content">
        <li class="list-item" v-for="(item, i) in recommendList" :key="i" @click.stop="selectItem(item)">
          <img v-lazy="item.picUrl">
          <h3 class="desc">{{item.name}}</h3>
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!recommendList.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import { getPersonalized, getRank } from 'api/index'
export default {
  data() {
    return {
      recommendList: [],
      rankList: []
    }
  },
  created() {
    this._getRank()
    this._getPersonalized()
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
    },
    _getPersonalized() {
      getPersonalized().then(res => {
        if (res.data.code === 200) {
          this.recommendList = res.data.result
        }
      })
    },
    _getRank() {
      getRank().then(res => {
        if (res.data.code === 200) {
          this.rankList = res.data.list.slice(0, 4)
        }
      })
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .recommend
    position: relative
    overflow-y: auto
    .rankList
      overflow: hidden
      .rank-title
        font-size: $font-size-medium-x
      .rank-content
        display: flex
        flex-direction: row
        justify-content: flex-start
        .rank-item
          margin: 20px 20px 20px 0
          float: left
          cursor: pointer
          img
            width 150px
          .name
            font-size: $font-size-medium
    .albumsList
      height 100%
      .topList-title
        font-size: $font-size-medium-x
      .topList-content
        height: 100%
        width: 100%
        display: flex
        flex-direction: row
        justify-content: space-between
        flex-wrap: wrap
        .list-item
          align-self: flex-start
          width: 150px
          height: 150px
          margin: 20px 20px 20px 0
          cursor: pointer
          img
            width 100%
            height 100%
          .desc
            font-size: $font-size-medium
            no-wrap()
        &:after
          content: ''
          flex: auto
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translate3d(0, -50%, 0)
</style>

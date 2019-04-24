<template>
  <div class="singer">
    <ul class="nav" ref="nav">
      <li class="nav_item" v-for="(title, i) in titles" :key="i">
        <span :class="{'active': i === active}" @click="selectItem(title, i)">{{title}}</span>
      </li>
    </ul>
    <div class="singer_wrapper" ref="singerWrapper">
      <ul class="singer_content">
        <li class="singer_item" v-for="(singer, i) in list" :key="i" @click="showSingerDetail(singer.id)">
          <div class="avatar" ref="avatar">
            <img class="pic" v-lazy="`${singer.picUrl}?param=130y130`" :key="singer.picUrl" width="100" height="100">
          </div>
          <div class="singer_detail">
            <div class="singer_title">
              <span class="singer_name">{{singer.name}}</span>
              <span class="singer_alias">{{singer.alias[0]}}</span>
            </div>
            <span class="music_size">单曲数：{{singer.musicSize}}</span>
            <span class="album_size">专辑数：{{singer.albumSize}}</span>
            <span class="score">人气：{{singer.score}}</span>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!list.length">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import { getTopSinger, getSingers } from 'api/index'
export default {
  data() {
    return {
      titles: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      list: [],
      active: 0
    }
  },
  created() {
    this._getTopSinger()
  },
  mounted() {
    this._calcHeight()
    window.addEventListener('resize', () => {
      this._calcHeight()
    })
  },
  methods: {
    selectItem(word, index) {
      this.active = index
      this.titles.indexOf(word) > 0 ? this._getSingers(word) : this._getTopSinger()
    },
    showSingerDetail(id) {
      this.$router.push({
        path: `/singer/${id}`
      })
    },
    _getTopSinger() {
      getTopSinger().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list.artists
        }
      })
    },
    _getSingers(word) {
      getSingers(word).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.artists
        }
      })
    },
    _calcHeight() {
      const nav = this.$refs.nav
      const navHeight = window.getComputedStyle(nav).height
      this.$refs.singerWrapper.style.height = `calc(100% - ${navHeight})`
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
  .singer
    position: relative
    // overflow-x: hidden
    background: $color-mask
    .nav
      width: auto
      height: auto
      line-height: 20px
      font-size: 0
      color: $color-text-ll
      overflow: hidden
      padding: 10px 5px
      box-sizing: border-box
      .nav_item
        float: left
        font-size: $font-size-small
        padding: 2px 0
        cursor: pointer
        &:after
          content: ''
          font-size: 0
          padding: 5px 0
          margin: 0 9px 0 10px
          border-right: 1px solid $color-text-d
          vertical-align: middle
        span
          padding: 2px 8px
          border-radius: 3px
          &:hover
            color: $color-lyric
          &.active
            color: $color-lyric
            background: rgba(0, 0, 0, .2)
    .singer_wrapper
      overflow-y: auto
      height: calc(100% - 70px)
      .singer_content
        display: flex
        flex-direction: row
        flex-wrap: wrap
        font-size: $font-size-small
        color: $color-text-d
        .singer_item
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: center
          margin: 20px 0 0 20px
          min-width: 200px
          cursor: pointer
          .avatar
            position: relative
            .pic
              border-radius: 50%
              margin-right: 10px
              transition: all .2s ease-in
              &:hover
                transform: scale(1.1)
            &:after
              content: ''
              position: absolute
              top: 0
              bottom: 0
              right: 0
              left: 0
              z-index: -1
              width: 100px
              height: 100px
              border-radius: 50%
              box-shadow: 1px 1px 30px #000
          .singer_detail
            flex: 1
            min-width: 150px
            display: flex
            flex-direction: column
            align-items: flex-start
            justify-content: space-between
            line-height: 20px
            max-width: 250px
            .singer_title
              .singer_name
                font-size: $font-size-medium
                color: $color-text-l
                margin-right: 5px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translate3d(0, -50%, 0)
</style>

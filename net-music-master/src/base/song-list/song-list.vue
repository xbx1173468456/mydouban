<template>
  <div class="song-list" v-show="songs.length">
    <div class="desc-header">
      <slot :titles="titles"></slot>
    </div>
    <div class="list-wrapper" @scroll="loadMore" ref="listWrapper">
      <ul>
        <li class="music-item"
            :class="{'active': item.id === currentSong.id, 'hide_item': canDelete}"
            v-for="(item, i) in songs" :key="i">
          <span class="count" :class="{'playing-icon': item.id === currentSong.id}">{{i+1}}</span>
          <span class="favorite" :class="[favoriteIcon(item) ? 'icon-favorite' : ' icon-not-favorite']" v-show="showFavorite"></span>
          <div class="item1">
            <span>{{item.name}}</span>
            <span class="desc">&nbsp;{{item.desc}}</span>
            <div class="mod_list_menu" ref="modMenu">
              <progress-circle :radius="24" :percent="data.percent" :showSvg="playing && item.id === currentSong.id">
                <i class="icon" :class="[playing && item.id === currentSong.id ? 'icon-pause-mini' : 'icon-play-mini']" @click.stop="selectItem(i)"></i>
              </progress-circle>
            </div>
          </div>
          <span class="item2">{{item.singer}}</span>
          <div class="item3">
            <span ref="content">{{!checkTitle('时长') ? item.album : formatTime(item.duration)}}</span>
            <i class="icon-clear" v-show="canDelete" ref="deleteBtn" @click="deleteItem(i)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ProgressCircle from 'base/progress-circle/progress-circle'
export default {
  inject: ['data'],
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => ['歌曲', '歌手', '专辑']
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    showFavorite: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'currentSong',
      'playing',
      'favoriteList'
    ])
  },
  created() {
    this.cacheIndex = 0
    this.isSelected = false
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.$nextTick(() => {
        this.index = this.findIndex(this.songs, this.currentSong)
        this.currentIndex > -1 && this.index > -1 && this.showMenu(this.index)
      })
    }, 16.7)
  },
  methods: {
    selectItem(index) {
      this.selectPlay({
        list: this.songs,
        index,
        playState: !this.playing
      })
    },
    deleteItem(index) {
      this.$emit('deleteItem', index)
    },
    loadMore() {
      this.$emit('loadMore')
    },
    showMenu(index) {
      this.$refs.modMenu[index].style.display = 'block'
      this.canDelete && (this.$refs.content[index].style.display = 'none')
      this.canDelete && (this.$refs.deleteBtn[index].style.display = 'inline-block')
    },
    hideMenu(index) {
      this.$refs.modMenu[index].style.display = ''
      this.canDelete && (this.$refs.content[index].style.display = '')
      this.canDelete && (this.$refs.deleteBtn[index].style.display = '')
    },
    isShow(index) {
      if (this.cacheIndex !== index) {
        if (this.cacheIndex > -1) {
          this.hideMenu(this.cacheIndex)
        }
        this.cacheIndex = index
      }
      this.showMenu(index)
    },
    findIndex(list, song) {
      return list.findIndex(item => item.id === song.id)
    },
    checkTitle(title) {
      return !!~this.titles.indexOf(title)
    },
    formatTime(time) {
      const miniute = time / 60 | 0
      const second = this._pad(time % 60 | 0)
      return `${miniute}:${second}`
    },
    favoriteIcon(song) {
      return this.findIndex(this.favoriteList, song) > -1
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    ...mapMutations({
      'setPlayingState': 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id !== oldSong.id) {
        this.setPlayingState(true)
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (this.index && this.index > -1) {
          this.$nextTick(() => {
            this.hideMenu(this.index)
            this.index = null
          })
        }
        let index = this.findIndex(this.songs, newSong)
        this.isShow(index)
      }, 16.7)
    }
  },
  components: {
    ProgressCircle
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .song-list
    width: 100%
    height: 100%
    overflow: hidden
    .desc-header
      display: flex
      width: 100%
      height: 50px
      line-height: 50px
      font-size: $font-size-medium
      .title1
        flex: 1
        padding-left: 40px
      .title2
        width: 20%
        margin-right: 10px
      .title3
        width: 15%
        margin-right: 10px
    .list-wrapper
      width: 100%
      height: calc(100% - 50px)
      overflow-y: auto
      .music-item
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-top: 1px solid hsla(0,0%,100%,.1)
        font-size: $font-size-medium
        overflow: hidden
        &.active
          color: $color-text
        .count
          width: 30px
          text-align: center
          margin-right: 10px
          &.playing-icon
            font-size: 0
            background: url('../../assets/img/wave.gif') no-repeat 50%
        .favorite
          margin-right: 10px
          line-height: 40px
          &.icon-favorite
            color: $color-favorite
        .item1
          flex: 1
          position: relative
          margin-right: 10px
          .desc
            font-size: $font-size-small
            color: $color-text-l
          .mod_list_menu
            position: absolute
            top: 0
            right: 10px
            z-index: 2
            width: auto
            height: 100%
            text-align: center
            display: none
            .progress-circle
              height: 40px
              box-sizing: border-box
              padding-top: 7px
              .icon
                position: absolute
                top: 0
                left: 0
                font-size: $font-size-large-xp
                line-height: 40px
                cursor: pointer
                color: $color-text-l
        .item2
          width: 20%
          margin-right: 10px
        .item3
          width: 15%
          margin-right: 10px
          .icon-clear
            font-size: $font-size-large-x
            line-height: 40px
            cursor: pointer
            display: none
        &:hover
          .mod_list_menu
            display: block
          .item3 .icon-clear
            display: inline-block
        &.hide_item
          &:hover
            .item3 span
              display: none
</style>

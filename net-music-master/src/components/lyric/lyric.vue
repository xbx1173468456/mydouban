<template>
  <div class="lyric">
    <div class="song-info">
      <template v-if="currentSong.id">
        <img :src="currentSong.image" class="song-pic">
        <p class="song-name">歌曲名：{{currentSong.name}}</p>
        <p class="singer-name">歌手名：{{currentSong.singer}}</p>
        <p class="album-name">专辑名：{{currentSong.album}}</p>
      </template>
      <template v-else>
        <img src="../../assets/img/defaultAlbum.png" class="song-pic">
        <p class="song-name">欢迎使用&nbsp;蒲公英&nbsp;播放器</p>
        <p class="singer-name">by&nbsp;中秋节</p>
      </template>
    </div>
    <div class="song-lyric" v-if="currentSong.id">
      <div class="lyric-wrapper">
        <div class="lyric-inner" :style="lyricTop" ref="lyric">
          <p v-for="(lyric, i) in lyrics" :key="i" :class="{'on': lyricIndex === i}">{{lyric.txt}}</p>
        </div>
      </div>
    </div>
    <div class="song-lyric" v-else>
      <p class="tip">你还未播放歌曲哟 ~</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

const LYRIC_LINE_HEIGHT = 34
export default {
  props: {
    lyrics: {
      type: Array,
      default: () => []
    },
    lyricIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    lyricTop() {
      if (this.lyricIndex < 1) return
      return `transform: translate3d(0, ${-LYRIC_LINE_HEIGHT * (this.lyricIndex - 1)}px, 0)`
    },
    ...mapGetters([
      'currentSong'
    ])
  },
  methods: {
    ...mapMutations({
      setLyricList: 'SET_LYRIC_LIST'
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .lyric
    position: relative
    z-index: 0
    flex-basis: 340px
    width: 340px
    text-align: center
    line-height: 24px
    font-size: $font-size-medium
    .song-info
      .song-pic
        width: 186px
        height: 186px
      .song-name, .singer-name, .album-name
        width: 100%
        height: 28px
        no-wrap()
      .song-name
        margin-top: 15px
    .song-lyric
      position: absolute
      top: 320px
      bottom: 50px
      left: 0
      width: 100%
      .lyric-wrapper
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        margin: auto
        height: 272px
        overflow: hidden
        mask-image: linear-gradient(to bottom,
                      rgba(255,255,255,0) 0,
                      rgba(255,255,255,.5) 15%,
                      rgba(255,255,255,1) 25%,
                      rgba(255,255,255,1) 75%,
                      rgba(255,255,255,.5) 85%,
                      rgba(255,255,255,0) 100%)
        .lyric-inner
          line-height: 34px
          cursor: grab
          transition: all .7s ease-in-out
          margin-top: 68px
          p.on
            color: $color-lyric
      .tip
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        margin: auto
        width: 100%
        height: 34px
        line-height: 34px
</style>

<template>
  <div id="app">
    <div class="container">
      <my-header></my-header>
      <tab></tab>
      <div class="content-wrapper">
         <router-view class="view" ref="temp"></router-view>
        <lyric :lyricIndex="lyricIndex" :lyrics="lyrics"></lyric>
      </div>
      <player @currentLyric="currentLyric" @getLyric="getLyric" @providePercent="providePercent"></player>
    </div>
    <bg-mask></bg-mask>
  </div>
</template>
<script>
import MyHeader from 'components/my-header/my-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
import Lyric from 'components/lyric/lyric'
import BgMask from 'base/bg-mask/bg-mask'
export default {
  data() {
    return {
      lyricIndex: 0,
      lyrics: [],
      percent: 0,
      disabled: true
    }
  },
  provide() {
    return {
      data: this.$data
    }
  },
  methods: {
    currentLyric(index) {
      this.lyricIndex = index
    },
    getLyric(lyrics) {
      this.lyrics = lyrics
    },
    providePercent(percent) {
      this.percent = percent
    }
  },
  watch: {
    '$route': function(newRoute) {
      if (newRoute.path !== '/playList') {
        this.disabled = true
        return
      }
      this.disabled = false
    }
  },
  components: {
    MyHeader,
    Tab,
    Player,
    Lyric,
    BgMask
  }
}
</script>
<style lang="stylus">
  #app
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    .container
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      margin: 0 100px
      .content-wrapper
        display: flex
        height: calc(100% - 184px)
        padding: 0 20px 0 20px
        .view
          flex: 1
          margin-top: 20px
</style>

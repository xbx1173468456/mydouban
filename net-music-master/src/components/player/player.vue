<template>
  <div class="player">
    <div class="btn-left">
      <i class="icon btn-prev" @click="prev"></i>
      <i class="icon" :class="playState" @click="togglePlay"></i>
      <i class="icon btn-next" @click="next"></i>
    </div>
    <div class="btn-center">
      <div class="music-info" v-if="currentSong.name">
        {{currentSong.name}} - {{currentSong.singer}}
      </div>
      <div class="music-info" v-else>
        欢迎使用
      </div>
      <div class="music-time">
        {{formatTime(currentTime)}} / {{formatTime(currentSong.duration)}}
      </div>
      <div class="progress-wrapper">
        <progress-bar :percent="percent" @onProgressBarChanging="onProgressBarChanging"></progress-bar>
      </div>
    </div>
    <div class="btn-right">
      <i class="icon play-mod" :class="playModeIcon" @click="changePlayMode"></i>
      <i class="icon" :class="favoriteIcon" @click="toggleLike(currentSong)"></i>
      <i class="icon btn-comment" @click="toComment"></i>
      <div class="play-voice">
        <i class="icon" :class="volumeIcon" @click="toggleVolume"></i>
        <progress-bar @onProgressBarChanging="onVolumeChange" :percent="1"></progress-bar>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.url"
          @playing="ready"
          @pause="paused"
          @error="error"
          @timeupdate="updateTime"
          @ended="end">
    </audio>
    <toast msg="请先播放歌曲" ref="toast"></toast>
  </div>
</template>
<script>
import ProgressBar from 'base/progress-bar/progress-bar'
import Toast from 'base/toast/toast'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'assets/js/config'
import { shuffle } from 'assets/js/util'
export default {
  inject: ['data'],
  data() {
    return {
      currentTime: 0,
      songReady: false,
      hasVolume: true
    }
  },
  computed: {
    playState() {
      return this.playing ? 'btn-pause' : 'btn-play'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    playModeIcon() {
      return this.playMode === playMode.sequence ? 'btn-sequence' : this.playMode === playMode.loop ? 'btn-loop' : 'btn-random'
    },
    favoriteIcon() {
      return this.isFavorite(this.currentSong) ? 'btn-like' : 'btn-unlike'
    },
    volumeIcon() {
      return this.hasVolume ? 'btn-voice' : 'btn-not-voice'
    },
    ...mapGetters([
      'playing',
      'playlist',
      'currentSong',
      'playMode',
      'currentIndex',
      'playlist',
      'sequenceList',
      'favoriteList',
      'isShowPlaylist'
    ])
  },
  created() {
    this.volume = 1
    this.lyrics = []
  },
  methods: {
    togglePlay() {
      if (!this.songReady) {
        this.$refs.toast.show()
        return
      }
      this.setPlayingState(!this.playing)
    },
    prev() {
      if (!this.songReady) {
        this.$refs.toast.show()
        return
      }
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    next() {
      if (!this.songReady) {
        this.$refs.toast.show()
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    ready() {
      this.songReady = true
      this.data.disabled && this.savePlayHistory(this.currentSong)
    },
    paused() {
      this.setPlayingState(false)
    },
    error() {
      this.songReady = true
    },
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime
    },
    end() {
      if (this.playMode === playMode.loop) {
        this.$refs.audio.currentTime = 0
        this.setPlayingState(true)
        this.$refs.audio.play()
      } else {
        this.next()
      }
    },
    onProgressBarChanging(percent) {
      if (!this.songReady) {
        return
      }
      this.currentTime = this.$refs.audio.currentTime = this.currentSong.duration * percent
    },
    changePlayMode() {
      if (!this.songReady) {
        this.$refs.toast.show()
        return
      }
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (this.playMode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    formatTime(time) {
      const miniute = time / 60 | 0
      const second = this._pad(time % 60 | 0)
      return `${miniute}:${second}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    toComment() {
      if (!this.currentSong.id) {
        this.$refs.toast.show()
        return
      }
      this.$router.push({
        path: `/comment/${this.currentSong.id}`
      })
    },
    toggleLike(song) {
      if (!this.songReady) {
        this.$refs.toast.show()
        return
      }
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1
    },
    toggleVolume() {
      if (this.hasVolume) {
        this.hasVolume = false
        this.$refs.audio.volume = 0
      } else {
        this.hasVolume = true
        this.$refs.audio.volume = this.volume
      }
    },
    onVolumeChange(percent) {
      this.volume = this.$refs.audio.volume = percent
    },
    getLyric() {
      this.currentSong.getLyric().then(lyric => {
        this.lyrics = lyric
        this.$emit('getLyric', this.lyrics)
      }).catch(err => {
        console.log(err)
      })
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaylist: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'savePlayHistory',
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  },
  watch: {
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      const audio = this.$refs.audio
      audio.src = newSong.url
      this.$nextTick(() => {
        audio.play()
      })
      this.getLyric()
    },
    currentTime(newTime) {
      let index = 0
      for (let i = 0; i < this.lyrics.length; i++) {
        if (newTime > this.lyrics[i].time) {
          index = i
        }
      }
      this.$emit('currentLyric', index)
      this.$emit('providePercent', this.percent)
    }
  },
  components: {
    ProgressBar,
    Toast
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .player
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 80px
    display: flex
    flex-direction: row
    align-items: center
    box-sizing: border-box
    padding: 0 20px
    .btn-left, .btn-right
      display: flex
      justify-content: space-around
      align-items: center
      .btn-prev
        width: 19px
        height: 20px
        background-position: 0 -30px
      .btn-play
        width: 21px
        height: 29px
        margin: 0 50px
        background-position: 0 0
      .btn-pause
        width: 21px
        height: 29px
        margin: 0 50px
        background-position: -29px 0
      .btn-next
        width: 19px
        height: 20px
        background-position: 0 -52px
    .btn-center
      position: relative
      width: 100%
      flex: 1
      box-sizing: border-box
      padding-left: 50px
      font-size: $font-size-small
      color: #fff
      .music-info
        position: absolute
        left: 50px
        top: 10px
      .music-time
        position: absolute
        right: 0
        top: 10px
      .progress-wrapper
        margin-top: 20px
    .btn-right
      position: relative
      width: 340px
      justify-content: flex-start
      .play-mod
        width: 26px
        margin-left: 50px
        &.btn-sequence
          height: 20px
          background-position: 0 -260px
        &.btn-loop
          height: 25px
          background-position: 0 -232px
        &.btn-random
          height: 19px
          background-position: 0 -74px
      .btn-unlike, .btn-like
        width: 23px
        height: 21px
        margin-left: 20px
        background-position: 0 -96px
      .btn-like
        background-position: -30px -96px
      .btn-comment
        width: 24px
        height: 24px
        margin-left: 20px
        background-position: 0 -400px
      .play-voice
        flex: 1
        margin-left: 20px
        display: flex
        align-items: center
        .btn-voice, .btn-not-voice
          width: 35px
          height: 24px
          background-position: 0 -143px
          margin-right: 5px
        .btn-not-voice
          background-position: 0 -181px
        .progress-bar
          width: 100%
  .icon
    display: block
    background-image: url('../../assets/img/player.png')
    cursor: pointer
    opacity: .8
</style>

<template>
  <div class="bg">
    <div class="bg_player_mask"></div>
    <div class="bg_player" ref="bg"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  watch: {
    currentSong(newSong) {
      this.$refs.bg.style.backgroundImage = `url(${newSong.image})`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variable'
  .bg
    .bg_player_mask
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: -1
      background: $color-mask
    .bg_player
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: -2
      filter: blur(50px)
      background-image: url('../../assets/img/preview.jpg')
      background-size: 100% 100%
      background-origin: 50%
      background-repeat: no-repeat
      transform: translateZ(0)
      opacity: .7
      transition: all .8s
</style>

<template>
  <div class="music-list">
    <song-list :songs="songs" #default="{titles}">
      <span v-for="(title, i) in titles" :key="i" :class="`title${i+1}`">{{title}}</span>
    </song-list>
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import { getPlaylistDetails } from 'api/index'
import { createSong } from 'assets/js/song'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      songs: [],
      id: this.$route.params.id
    }
  },
  created() {
    this._getPlaylistDetails(this.id)
  },
  methods: {
    // selectItem(index) {
    //   this.selectPlay({
    //     list: this.songs,
    //     index
    //   })
    // },
    _getPlaylistDetails(id) {
      getPlaylistDetails(id).then(res => {
        if (res.data.code === 200) {
          this.songs = this.normalizedSong(res.data.playlist.tracks)
        }
      })
    },
    normalizedSong(musicData) {
      const ret = []
      for (let song of musicData) {
        if (song.id) {
          ret.push(createSong(song))
        }
      }
      return ret
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    Loading,
    SongList
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .music-list
    position: relative
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translate3d(0, -50%, 0)
</style>

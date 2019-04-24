<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper">
      <ul>
        <li class="item" v-for="(item, i) in hotKey" :key="i" @click="addQuery(item.first)">
          <span>{{item.first}}</span>
        </li>
      </ul>
    </div>
    <div class="history" v-if="!songs.length && !query">
      <div class="history-title">
        <h1>搜索历史</h1>
        <span @click="clearHistory">
          <i class="icon-clear"></i>
        </span>
      </div>
      <history-list :historyList="searchHistory" @selectItem="addQuery" @del="delHistory"></history-list>
    </div>
    <div class="list-container" v-else>
      <song-list ref="songList" :songs="songs" @selectItem="selectItem" @loadMore="loadMore" #default="{titles}">
        <span v-for="(title, i) in titles" :key="i" :class="`title${i+1}`">{{title}}</span>
      </song-list>
    </div>
    <div class="loading-container" v-show="!songs.length && query">
      <loading></loading>
    </div>
    <toast msg="删除成功" ref="toast"></toast>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'
import HistoryList from 'components/historyList/historyList'
import Toast from 'base/toast/toast'
import { createSearchSong } from 'assets/js/song'
import { getHotKey, getKeys, getSongDetails } from 'api/index'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      query: '',
      hotKey: [],
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory',
      'playing'
    ])
  },
  created() {
    this.offset = 0
    this._getHotKey()
  },
  methods: {
    onQueryChange(query) {
      this.songs = []
      this.offset = 0
      this.query = query.trim()
      if (!this.query) {
        return
      }
      this.saveSearchHistory(this.query)
      this._getKeys(this.query)
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    async selectItem(index) {
      const image = await this._getSongDetails(this.songs[index].id)
      Object.assign(this.songs[index], {
        image
      })
      this.selectPlay({
        list: this.songs,
        index,
        playState: !this.playing
      })
    },
    normalizedSong(musicData) {
      const ret = []
      for (let song of musicData) {
        if (song.id) {
          ret.push(createSearchSong(song))
        }
      }
      return ret
    },
    loadMore() {
      let scrollTop = this.$refs.songList.$refs.listWrapper.scrollTop
      const scrollHeight = this.$refs.songList.$refs.listWrapper.scrollHeight
      const clientHeight = this.$refs.songList.$refs.listWrapper.clientHeight
      if (scrollTop === (scrollHeight - clientHeight)) {
        this.offset++
        this._getKeys()
      }
    },
    delHistory(query) {
      this.deleteSearchHistory(query)
    },
    clearHistory() {
      this.clearSearchHistory()
      this.$refs.toast.show()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.data.code === 200) {
          this.hotKey = res.data.result.hots
        }
      })
    },
    _getKeys() {
      getKeys(this.query, this.offset).then(res => {
        if (res.data.code === 200) {
          this.songs = this.songs.concat(this.normalizedSong(res.data.result.songs))
        }
      })
    },
    _getSongDetails(id) {
      return getSongDetails(id).then(res => {
        if (res.data.code === 200) {
          return res.data.songs[0].al.picUrl
        }
      })
    },
    ...mapActions([
      'selectPlay',
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  components: {
    SearchBox,
    SongList,
    Loading,
    HistoryList,
    Toast
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .search
    position: relative
    overflow: hidden
    .shortcut-wrapper
      width: 100%
      background: $color-mask
      box-shadow: 0 1px 5px rgba(0, 0, 0, .6)
      h1
        font-size: $font-size-medium-x
      ul
        display: flex
        flex-wrap: wrap
        font-size: $font-size-medium
        color: $color-text
        .item
          padding: 10px
          margin-right: 10px
          border-radius: 2px
          cursor: pointer
          white-space: nowrap
    .history
      width: 100%
      margin-top: 20px
      .history-title
        display: flex
        justify-content: space-between
        h1
          height: 30px
          line-height: 30px
          font-size: $font-size-medium
        span
          display: block
          width: 30px
          height: 30px;
          line-height: 30px
          font-size: $font-size-large
          text-align: center
          cursor: pointer
    .list-container
      width: 100%
      height: calc(100% - 84px)
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translate3d(0, -50%, 0)
</style>

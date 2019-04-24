<template>
  <div class="singer-detail">
    <div class="detail_header">
      <div class="detail_wrapper">
        <div class="detail_avatar" @click.stop="showDetail">
          <img  class="pic" v-lazy="`${artist.picUrl}?param=130y130`" width="100%" height="100%">
        </div>
        <div class="detail_desc">
          <div class="detail_title">
            <span class="detail_name">{{artist.name}}</span>
            <span class="detail_alias">{{artist.alias && artist.alias[0]}}</span>
          </div>
          <span class="info" :title="artist.briefDesc" @click.stop="showDetail">{{artist.briefDesc}}</span>
          <span class="music_size">单曲数：{{artist.musicSize}}</span>
          <span class="album_size">专辑数：{{artist.albumSize}}</span>
          <span class="mv_size">MV数：{{artist.mvSize}}</span>
          <span class="singer_desc" @click.stop="showDetail">详情</span>
        </div>
      </div>
      <div class="detail_background" :style="background">
        <img :src="artist.picUrl" width="100%" height="100%">
      </div>
    </div>
    <div class="detail_content">
      <div class="album_item" v-for="(album, i) in albums" :key="i">
        <div class="album_wrapper">
          <div class="album_pic">
            <img v-lazy="album.image" width="150" height="150">
          </div>
          <div class="album_info">
            <p class="album_name">{{album.name}}</p>
            <p class="publishTime">发布时间：{{album.publishTime}}</p>
            <p class="comment_count">评论数：{{album.info.commentCount}}</p>
            <p class="share_count">分享数：{{album.info.shareCount}}</p>
          </div>
          <div class="album_songs">
            <div class="song_wrapper" ref="songWrapper">
              <ul class="song_list" ref="songList">
                <li class="song_item" v-for="(song, i) in album.songs" :key="i" @dblclick.stop="selectItem(i, album.songs)">
                  <span class="count">{{i + 1}}</span>
                  <span class="song_name">{{_normalizeName(song.name)}}</span>
                  <span class="duration">{{_formatTime(song.duration)}}</span>
                </li>
              </ul>
            </div>
            <div class="slide_down" v-show="album.songs.length > 4" @click.stop="toggleSlide(i)">
              <i class="icon-back" ref="back"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <singer-desc :id="id" :txt="txt" ref="singerDesc"></singer-desc>
  </div>
</template>
<script>
import SingerDesc from 'components/singer-desc/singer-desc'
import { getSingerDetail, getSingerDesc, getSingerAlbum } from 'api/index'
import { createAlbum } from 'assets/js/album'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      id: this.$route.params.id,
      hotSongs: [],
      artist: {},
      txt: [],
      albums: [],
      active: 0
    }
  },
  computed: {
    background() {
      return `backgroundImage: url(${this.artist.picUrl})`
    }
  },
  created() {
    this._getSingerDetail()
    this._getSingerDesc()
    this._getSingerAlbum()
    this.flag = true
  },
  methods: {
    showDetail() {
      this.$refs.singerDesc.show()
    },
    toggleSlide(i) {
      if (this.flag) {
        const height = this.$refs.songList[i].clientHeight
        this.$refs.songWrapper[i].style.maxHeight = `${height}px`
        this.$refs.back[i].style['transform'] = `rotate(90deg)`
        this.flag = false
      } else {
        this.$refs.songWrapper[i].style.maxHeight = `120px`
        this.$refs.back[i].style['transform'] = `rotate(-90deg)`
        this.flag = true
      }
    },
    selectItem(index, songs) {
      this.selectPlay({
        list: songs,
        index
      })
    },
    _getSingerDetail() {
      getSingerDetail(this.id).then(res => {
        if (res.data.code === 200) {
          this.hotSongs = res.data.hotSongs
          this.artist = res.data.artist
        }
      })
    },
    _getSingerDesc() {
      getSingerDesc(this.id).then(res => {
        if (res.data.code === 200) {
          this.txt = res.data.introduction[0] ? this._normalizeTxt(res.data.introduction[0].txt) : ['暂无个人资料']
        }
      })
    },
    _getSingerAlbum() {
      getSingerAlbum(this.id).then(res => {
        if (res.data.code === 200) {
          this._normalizeAlbum(res.data.hotAlbums).forEach(album => {
            album.getAlbumSongs().then(songs => {
              this.albums.push(Object.assign(album, { songs }))
            })
          })
        }
      })
    },
    _normalizeAlbum(albums) {
      const ret = []
      for (let item of albums) {
        if (item.id) {
          ret.push(createAlbum(item))
        }
      }
      return ret
    },
    _normalizeTxt(txt) {
      let regTxt = /\n/g
      return txt.split(regTxt)
    },
    _normalizeName(songName) {
      let reg = /《(.+)》/g
      return songName.replace(reg, (word, $1) => {
        return $1
      })
    },
    _formatTime(time) {
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
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    SingerDesc
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .singer-detail
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 1
    background: rgba(0, 0, 0, 1)
    .detail_header
      position: relative
      box-sizing: border-box
      background: rgba(0, 0, 0, .3)
      overflow: hidden
      .detail_background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(50px)
      .detail_wrapper
        display: flex
        flex-direction: row
        justify-content: flex-start
        align-items: center
        font-size: $font-size-small
        color: $color-text-l
        padding: 24px 12px 24px 40px
        .detail_avatar
          flex: 0 0 100px
          width: 100px
          margin-right: 20px
          .pic
            height: 100%
            border-radius: 50%
            cursor: pointer
        .detail_desc
          position: relative
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-around
          align-items: flex-start
          overflow: hidden
          line-height: 20px
          .detail_name
            font-size: $font-size-medium-x
            color: $color-text-ll
            margin-right: 5px
          .info
            width: 100%
            cursor: pointer
            no-wrap()
          .singer_desc
            position: absolute
            right: 0
            bottom: 0
            width: 50px
            height: 20px
            border: 1px solid $color-text-d
            border-radius: 10px
            text-align: center
            &:hover
              border-color: $color-text-ll
              cursor: pointer
    .detail_content
      height: calc(100% - 150px)
      overflow-y: auto
      font-size: $font-size-medium
      .album_item
        position: relative
        box-sizing: border-box
        padding: 20px 20px 0 20px
        margin-bottom: 20px
        .album_wrapper
          position: relative
          display: flex
          flex-direction: row
          align-items: flex-start
          .album_pic
            flex: 0 0 150px
            width: 150px
            height: 150px
            margin-right: 50px
            img
              width: 100%
          .album_info
            width: 250px
            display: flex
            flex-direction: column
            justify-content: space-around
            line-height: 20px
            margin-top: 30px
            .album_name
              font-size: $font-size-medium-x
              color: $color-text-ll
              margin-bottom: 10px
          .album_songs
            flex: 1
            .song_wrapper
              max-height: 120px
              box-sizing: border-box
              overflow: hidden
              transition: all .2s ease-in-out
              .song_list
                .song_item
                  height: 30px
                  line-height: 30px
                  &:nth-child(2n)
                    background: rgba(34, 34, 34, .7)
                  &:nth-child(2n-1)
                    background: rgba(17, 17, 17, .7)
                  &:hover
                    background: rgba(255, 255, 255, .2)
                  .count
                    display: inline-block
                    width: 30px
                    text-align: center
                    margin-right: 10px
                  .song_name
                    display: inline-block
                    width: 50%
                    color: $color-text-ll
                  .duration
                    float: right
                    margin: 0 20px
            .slide_down
              height: 30px
              line-height: 30px
              background: rgba(17, 17, 17, .7)
              text-align: center
              transition: all .2s linear
              &:hover
                background: rgba(255, 255, 255, .2)
              .icon-back
                display: inline-block
                padding: 5px
                cursor: pointer
                font-size: $font-size-small
                transform: rotate(-90deg)
                transition: all .2s ease-in-out
</style>

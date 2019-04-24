<template>
  <div class="playList">
    <template v-show="playHistory.length > 0">
      <song-list :songs="playHistory" @deleteItem="deleteItem" :canDelete="true" :titles="['歌曲', '歌手', '时长']" #default="{titles}">
        <span v-for="(title, i) in titles" :key="i" :class="`title${i+1}`">{{title}}</span>
      </song-list>
    </template>
    <toast msg="删除成功" ref="toast"></toast>
  </div>
</template>
<script>
import SongList from 'base/song-list/song-list'
import Toast from 'base/toast/toast'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'playList',
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    deleteItem(index) {
      this.deletePlayHistory(this.playHistory[index])
      this.$refs.toast.show()
    },
    ...mapActions([
      'deletePlayHistory'
    ])
  },
  components: {
    SongList,
    Toast
  }
}
</script>
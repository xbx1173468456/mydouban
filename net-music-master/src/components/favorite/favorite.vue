<template>
  <div class="favorite">
    <song-list :songs="favoriteList" @deleteItem="deleteItem" :canDelete="true" :titles="['歌曲', '歌手', '时长']" #default="{titles}">
      <span v-for="(title, i) in titles" :key="i" :class="`title${i+1}`">{{title}}</span>
    </song-list>
    <toast msg="删除成功" ref="toast"></toast>
  </div>
</template>
<script>
import SongList from 'base/song-list/song-list'
import Toast from 'base/toast/toast'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods: {
    deleteItem(index) {
      this.deleteFavoriteList(this.favoriteList[index])
      this.$refs.toast.show()
    },
    ...mapActions([
      'deleteFavoriteList'
    ])
  },
  components: {
    SongList,
    Toast
  }
}
</script>
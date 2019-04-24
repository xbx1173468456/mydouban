<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" ref="query" class="box" :placeholder="placeholder" v-model="query">
    <i class="icon-delete" v-show="query" @click="clear"></i>
  </div>
</template>
<script>
import { debounce } from 'assets/js/util'
export default {
  data() {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 500))
  },
  methods: {
    clear() {
      this.query = ''
    },
    blur() {
      this.$refs.query.blur()
    },
    setQuery(query) {
      this.query = query
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .search-box
    position: relative
    width: 100%
    height: 50px
    line-height: 50px
    .icon-search
      position: absolute
      top: 5px
      line-height: 40px
      width: 40px
      text-align: center
      font-size: $font-size-large-xp
    .box
      box-sizing: border-box
      border: 1px solid hsla(0, 0, 100%, .6)
      outline: 0
      background: transparent
      border-radius: 2px
      width: 100%
      height: 40px
      color: $color-text
      padding: 0 40px
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-l
    .icon-delete
      position: absolute
      top: 5px
      right: 0
      font-size: $font-size-medium
      color: $color-text-l
      width: 40px
      height: 40px
      line-height: 40px
      text-align: center
      cursor: pointer
</style>

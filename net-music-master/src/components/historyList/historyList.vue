<template>
  <div class="historyList">
    <ul>
      <li class="item" v-for="(item, i) in historyList" :key="i" @click.stop="selectItem(item)">
        <span class="word">{{item}}</span>
        <span class="del" @click.stop="del(item)">&times;</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    historyList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem(query) {
      this.$emit('selectItem', query)
    },
    del(query) {
      this.$emit('del', query)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variable'
  .historyList
    width: 100%
    .item
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 40px
      .word
        font-size: $font-size-medium
        color: $color-text-l
      .del
        font-size: $font-size-large-x
        color: $color-text-l
        cursor: pointer
        box-sizing: border-box
        line-height: 0
        padding: 20px 10px
</style>

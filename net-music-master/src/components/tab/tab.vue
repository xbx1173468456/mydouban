<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/playList">
      <span class="link-item">播放列表</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="link-item">热门推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="link-item">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="link-item">搜索</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/favorite">
      <span class="link-item">我喜欢的</span>
    </router-link>
  </div>
</template>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .tab
    height: 44px
    line-height: 44px
    display: flex
    align-items: center
    margin-left: 20px
    .tab-item
      border: 1px solid $color-text-l
      text-align: center
      height: 35px
      line-height: 35px
      margin-right: 10px
      &.router-link-active
        border-color: $color-text
        color: $color-text
      &:hover
        border-color: $color-text
        color: $color-text
        .link-item
          color: $color-text
      .link-item
        box-sizing: border-box
        display: block
        width: 100%
        height: 100%
        padding: 0 10px
        cursor: pointer
        font-size: $font-size-medium
</style>

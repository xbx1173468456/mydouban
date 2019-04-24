<template>
  <transition name="slide">
    <div class="singer_desc" v-show="isShow" @click.stop="hide">
      <div class="desc_wrapper">
        <h1 class="desc_title">个人资料</h1>
        <p class="txt" v-for="(t, i) in txt" :key="i">{{t}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    txt: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    hide() {
      this.isShow = false
    },
    show() {
      this.isShow = true
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .slide-enter, .slide-leave-to
    transform: translate3d(-100%, 0, 0)
    opacity: 0
  .slide-enter-active, .slide-leave-active
    transition: all .3s ease-in-out
  .singer_desc
    position: absolute
    top: 0
    bottom: 0
    right: -350px
    width: 340px
    background: rgba(0, 0, 0, .8)
    margin-left: 10px
    overflow-y: auto
    .desc_wrapper
      box-sizing: border-box
      width: 100%
      height: 100%
      padding: 25px 25px 50px
      .desc_title
        margin: 20px auto
        text-align: center
        font-size: $font-size-large-x
      .txt
        white-space: pre-wrap
        font-size: $font-size-medium
        line-height: 24px
</style>

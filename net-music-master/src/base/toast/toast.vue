<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">{{msg}}</div>
  </transition>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: '喵喵喵 !?'
    },
    delay: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShow = false
      }, this.delay)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variable'
  .fade-enter
    opacity: 0
    transform: translate3d(0, -20px, 0)
  .fade-leave-to
    opacity: 0
  .fade-enter-active, .fade-leave-active
    opacity: 1
    transition: all .5s ease-in-out
  .toast
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 100
    margin: auto
    max-width: 50%
    width: 100px
    height: 40px
    max-height: 50%
    color: $color-text-ll
    background: rgba(0, 0, 0, 1)
    font-size: $font-size-medium
    line-height: 40px
    border-radius: 5px
    text-align: center
    overflow: hidden
</style>

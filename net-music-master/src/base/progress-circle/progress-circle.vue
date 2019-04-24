<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100">
      <circle class="background" cx="50" cy="50" r="50" fill="transparent"></circle>
      <circle class="bar" cx="50" cy="50" r="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" v-show="showSvg"></circle>
    </svg>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 100
    },
    showSvg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variable'
  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.background
        stroke: $color-text-d
        transform: rotate(-90deg) scale(.9)
      &.bar
        transform: rotate(-90deg) scale(.9)
        stroke: $color-progress
</style>

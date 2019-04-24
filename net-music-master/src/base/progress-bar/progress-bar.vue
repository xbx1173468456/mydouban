<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
          @mousedown.prevent.stop="progressMouseDown">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
const progressBtnWidth = 10
export default {
  props: {
    percent: {
      type: Number,
      defalut: 0
    }
  },
  created() {
    this.move = {
      initiated: false
    }
  },
  mounted() {
    this.initEvent()
    this.progressDefaultFixed(this.percent)
  },
  methods: {
    initEvent() {
      document.addEventListener('mousemove', this.progressMouseMove)
      document.addEventListener('mouseup', this.progressMouseUp)
    },
    removeEvent() {
      document.removeEventListener('mousemove', this.progressMouseMove)
      document.removeEventListener('mouseup', this.progressMouseUp)
    },
    progressMouseDown(e) {
      this.move.initiated = true
      this.move.startX = e.pageX
      this.move.left = this.$refs.progress.clientWidth
    },
    progressMouseMove(e) {
      if (!this.move.initiated) {
        return
      }
      const deltaX = e.pageX - this.move.startX
      const distance = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.move.left + deltaX))
      this._offset(distance)
      this._triggerPercent()
    },
    progressMouseUp() {
      this.move.initiated = false
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, e.pageX - rect.left - progressBtnWidth / 2))
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    progressDefaultFixed(percent) {
      this._progressOffset(percent)
      this._triggerPercent()
    },
    _triggerPercent() {
      this.$emit('onProgressBarChanging', this._getPercent())
    },
    _offset(distance) {
      this.$refs.progress.style.width = `${distance}px`
      this.$refs.progressBtn.style['transform'] = `translate3d(${distance}px, 0, 0)`
    },
    _getPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      return this.$refs.progress.clientWidth / barWidth
    },
    _progressOffset(percent) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const offsetWidth = barWidth * percent
      this._offset(offsetWidth)
    }
  },
  watch: {
    percent(newPercent) {
      this._progressOffset(newPercent)
    }
  },
  beforeDestroy() {
    this.removeEvent()
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variable'
  .progress-bar
    height: 30px
    cursor: pointer
    .bar-inner
      position: relative
      top: 13px
      height: 2px
      background: rgba(0, 0, 0, .3)
      .progress
        position: absolute
        height: 100%
        background: $color-progress
      .progress-btn-wrapper
        position: absolute
        left: -10px
        top: -14px
        width: 30px;
        height: 30px;
        .progress-btn
          position: relative
          top: 10px
          left: 10px
          box-sizing: border-box
          width: 10px;
          height: 10px;
          border-radius: 50%
          background: #fff
</style>

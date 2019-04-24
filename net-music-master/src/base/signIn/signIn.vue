<template>
  <div class="logMask" v-show="showFlag" @click.stop="hide">
    <div class="logWrapper" @click.stop>
      <div class="title">登录</div>
      <div class="content">
        <div class="user">
          <input type="text" name="" id="" placeholder="请输入邮箱/手机号" v-model="uname">
        </div>
        <div class="pwd">
          <input type="password" placeholder="请输入密码" v-model="upwd">
        </div>
      </div>
      <div class="controls">
        <button @click="hide">取消</button>
        <button @click="signIn">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser } from 'api/index'
import { cacheUser } from 'assets/js/user'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      showFlag: false,
      uname: '',
      upwd: ''
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    signIn() {
      getUser(this.uname, this.upwd).then(res => {
        if (res.data.code === 200) {
          this.setUser(cacheUser(res.data))
          this.$emit('refresh')
          this.hide()
        }
      })
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .logMask
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 1
    background: $color-mask
    .logWrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0)
      width: 400px
      height: 200px
      border-radius: 5px
      background: #222
      .title
        height: 40px
        line-height: 40px
        font-size: $font-size-large-x
      .content
        padding: 5px 30px
        .user, .pwd
          height: 40px
          margin-bottom: 10px
          [type='text'], [type="password"]
            width: 100%
            height: 40px
            padding: 0 15px
            background: transparent
            background-color: #333
            outline: 0
            box-sizing: border-box
            border-radius: 2px
            color: $color-text-ll
            font-size: $font-size-medium
            &::placeholder
              color: $color-text-d
      .controls
        height: 40px
        text-align: right
        padding: 0 30px
        button
          width: 50px
          height: 100%
          background: transparent
          background-color: #333
          outline: 0
          border: 0
          border-radius: 5px
          color: $color-text-d
          cursor: pointer
          margin-left: 30px
          &:hover
            color: $color-text-ll
</style>

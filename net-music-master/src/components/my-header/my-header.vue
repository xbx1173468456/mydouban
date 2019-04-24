<template>
  <div class="header">
    <h1 class="logo">蒲公英</h1>
    <template v-if="!ownner">
      <div class="user">
        <span class="signIn" @click="showLog">登录</span>
      </div>
    </template>
    <template v-else>
      <div class="user">
        <a class="avatar">
          <img class="pic" v-lazy="ownner.avatar" height="40">
        </a>
        <span class="userName" :title="ownner.name">{{ownner.name}}</span>
        <span class="logOut" @click="logOut">退出</span>
      </div>
    </template>
    <signIn ref="signIn" @refresh="refresh"></signIn>
  </div>
</template>
<script>
import SignIn from 'base/signIn/signIn'
import { mapGetters, mapMutations } from 'vuex'
import storage from 'good-storage'
const USER_KEY = '__user__'
export default {
  data() {
    return {
      ownner: storage.get(USER_KEY, '')
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    showLog() {
      this.$refs.signIn.show()
    },
    logOut() {
      storage.remove(USER_KEY)
      this.setUser('')
      this.ownner = ''
    },
    refresh() {
      this.ownner = this.user
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },
  components: {
    SignIn
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/mixin'
  @import '~assets/stylus/variable'
  .header
    position: relative
    height: 40px
    line-height: 40px
    font-size: 0
    text-align: center
    input
      width: 100px
      height: 40px
    .logo
      display: inline-block
      font-size: $font-size-large
      &:hover
        color: $color-text
    .user
      position: absolute
      top: 0
      right: 0
      height: 100%
      font-size: 0
      margin-right: 20px
      .avatar
        display: inline-block
        height: 100%
        vertical-align: middle
        margin-right: 5px
        cursor: pointer
        .pic
          border-radius: 50%
      .userName
        display: inline-block
        height: 100%
        vertical-align: top
        max-width: 100px
        font-size: $font-size-medium
        no-wrap()
      .signIn, .logOut
        font-size: $font-size-medium
        vertical-align: top
        cursor: pointer
        &:hover
          color: $color-text
</style>

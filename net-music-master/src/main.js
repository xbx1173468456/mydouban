import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from 'store'
import lazyload from 'vue-lazyload'

import 'assets/stylus/index.styl'

Vue.use(lazyload, {
  preLoad: 1,
  loading: require('assets/img/lazy-load.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

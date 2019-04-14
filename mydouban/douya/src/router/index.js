import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Heade from '../components/home/Heade.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Heade',
      component:Heade
    }
  ]
})

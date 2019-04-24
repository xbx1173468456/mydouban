import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Search = () => import('components/search/search')
const MusicList = () => import('components/music-list/music-list')
const Comment = () => import('components/comment/comment')
const PlayList = () => import('components/playList/playList')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const Favorite = () => import('components/favorite/favorite')

export default new Router({
  routes: [
    {
      path: '/', redirect: '/recommend'
    },
    {
      path: '/playList',
      component: PlayList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/recommend/:id',
      component: MusicList
    },
    {
      path: '/comment/:id',
      component: Comment
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id', component: SingerDetail
        }
      ],
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/favorite',
      component: Favorite
    }
  ]
})

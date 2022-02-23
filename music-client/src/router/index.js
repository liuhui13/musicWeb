import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import MyMusic from '@/pages/MyMusic'
import Singer from '@/pages/Singer'
import SongList from '@/pages/SongList'
import Search from '@/pages/Search'
import Lyric from '@/pages/lyric'
import SignUp from '@/pages/SignUp'
import LoginIn from '@/pages/LoginIn'
import Setting from '@/pages/Setting'
import SingerAlbum from '@/pages/SingerAlbum'
import SongListAlbum from '@/pages/SongListAlbum'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [    
    {
      path: '/',
      name: 'home',//首页面
      component: Home
    },
    {
      path: '/my-music',
      name: 'my-music',//我的音乐
      component: MyMusic,
      redirect:'/my-music-collect',//默认在我的收藏
      children:[
        {
          path:'/my-music-collect',
          name:'my-music-collect',//我的收藏
          component: () => import('../pages/MyMusicCollect')
        },
        {
          path:'/my-music-singer',
          name:'my-music-singer',//我的歌手
          component: () => import('../pages/MyMusicSinger')
        },
      ]
    },
    {
      path: '/singer',
      name: 'singer',//歌手页面
      component: Singer
    },
    {
      path: '/song-list',
      name: 'song-list',//歌单页面
      component: SongList
    },
    {
      path: '/search',
      name: 'search',//搜索
      component: Search
    },
    {
      path: '/lyric',
      name: 'lyric',//歌词页面
      component: Lyric
    },
    {
      path: '/sign-up',
      name: 'sign-up',//注册页面
      component: SignUp
    },
    {
      path: '/login-in',
      name: 'login-in',//登录页面
      component: LoginIn
    },
    {
      path: '/setting',
      name: 'setting',//个人信息修改
      component: Setting
    },
    {
      path: '/singer-album/:id',
      name: 'singer-album',//歌手详情
      component: SingerAlbum
    },
    {
      path: '/song-list-album/:id',
      name: 'song-list-album',//歌单详情
      component: SongListAlbum
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

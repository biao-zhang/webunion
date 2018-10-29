import Vue from 'vue'
import Router from 'vue-router'
import ALogin from '@/components/admin/alogin'

import admin from './admin'
import web from './web'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 登录页
    {
      path: '/',
      name : 'alogin',
      component: ALogin
    },
    admin,
    web
  ]
})

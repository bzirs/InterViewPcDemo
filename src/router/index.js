/**
 * @Author: bzirs
 * @Date: 2022-12-08 15:42:59
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 20:42:42
 * @FilePath: /interview-pc/src/router/index.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import article from '@/views/article'
import dashboard from '@/views/dashboard'
import login from '@/views/login'
import layout from '@/views/layout'

// 从vuex中获取token
import store from '@/store'

// 从本地获取token
import { getToken } from '@/utils/storage'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/login', component: login, name: 'login' },
  {
    path: '/layout',
    component: layout,
    name: 'layout',
    children: [
      { path: '/layout', redirect: '/layout/dashboard' },
      { path: '/layout/article', component: article, name: 'article' },
      { path: '/layout/dashboard', component: dashboard, name: 'dashboard' }
    ]
  }
]
const router = new VueRouter({
  routes
})
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path) || store.state.user.token || getToken()) {
    next()
  } else {
    next('/login')
    Message({
      showClose: true,
      message: '请先登录,小瘪三',
      type: 'error'
    })
  }
})

export default router
